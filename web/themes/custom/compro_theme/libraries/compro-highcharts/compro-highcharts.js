/**
 * @file
 * Theme code for using highcharts.
 */

var comproHighchartsInit = false;
(function ($, Drupal) {
  Drupal.behaviors.comproHighcharts = {
    attach: function (context, settings) {
      if (context === document && !comproHighchartsInit) {
        comproHighchartsInit = true;

        if (Highcharts && typeof Highcharts.chart === 'function') {
          var $charts = $('.js-chart-vertical-bar, .js-chart-pie, .js-chart-line, .js-chart-horizontal-bar, .js-chart-stacked, .js-chart-stacked-100'),
            incrementer = 0; // Increment table id attributes because tablefield renders duplicate IDs.

          if ($charts.length) {
            // Set color scheme to a tetrade off the main theme color.
            var styles = getComputedStyle(document.documentElement);
            var colorValue = styles.getPropertyValue('--color--main'),
              cvNoHex = colorValue.substr(2);
            var scheme = new ColorScheme;
              scheme.from_hex(cvNoHex)
                .scheme('tetrade');
            var colors = scheme.colors();
            colors = colors.map(x => "#" + x);

            $charts.each(function(){
              var $this = $(this),
                $table = $this.find('table'),
                yaxis = 'Units',
                yaxis_secondary = '',
                double_axis = false,
                units = '',
                charttitle = false,
                legend_horizontal = 'center',
                legend_vertical = 'bottom',
                legend_layout = 'horizontal',
                chartsubtitle = '';

              // Set some helpers for instantiating the chart.
              var tableID = $table.attr('id');
              $table.attr('id', tableID + '-' + incrementer);
              incrementer++;

              if ($this.data('yaxis') && $this.data('yaxis').length) {
                yaxis = $this.data('yaxis');
              }
              if ($this.data('yaxis-secondary') && $this.data('yaxis-secondary').length) {
                yaxis_secondary = $this.data('yaxis-secondary');
                double_axis = true;
              }
              if ($this.data('charttitle') && $this.data('charttitle').length) {
                charttitle = $this.data('charttitle');
              }
              if ($this.data('chartsubtitle') && $this.data('chartsubtitle').length) {
                chartsubtitle = $this.data('chartsubtitle');
              }
              if ($this.data('units') && $this.data('units').length) {
                units = $this.data('units');
              }
              if ($this.data('legend-xalign') && $this.data('legend-xalign').length) {
                legend_horizontal = $this.data('legend-xalign');
              }
              if ($this.data('legend-yalign') && $this.data('legend-yalign').length) {
                legend_vertical = $this.data('legend-yalign');
              }
              if ($this.data('legend-layout') && $this.data('legend-layout').length) {
                legend_layout = $this.data('legend-layout');
              }

              // Create an ID container for the chart.
              var chart_id = $table.attr('id') + '-chart';
              $this.prepend('<div id="' + chart_id + '" class="compro-highcharts"></div>');

              // Instantiate the chart using table data.

              var this_chart = {
                chart: {
                  type: 'column'
                },
                colors: colors,
                title: {
                  text: charttitle,
                },
                subtitle: {
                    text: chartsubtitle
                },
                yAxis: [{
                  opposite: false,
                  title: {
                    text: yaxis
                  }
                }, {
                  opposite: true,
                  title: {
                    text: yaxis_secondary
                  }
                }],
                xAxis: {
                  allowDecimals: false
                },
                legend: {
                  align: legend_horizontal,
                  verticalAlign: legend_vertical
                },
                exporting: {
                  allowHTML: true,
                  buttons: {
                    contextButton: {
                      menuItems: [
                        'printChart',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG',
                        'separator',
                        'downloadCSV',
                        'downloadXLS'
                      ]
                    }
                  }
                },
                data: {
                  table: $table.attr('id')
                }
              };

              // Generate a Pie Graph
              if ($this.hasClass('js-chart-pie')) {
                this_chart.chart.type = 'pie';

                this_chart.tooltip = {
                  pointFormat: '<span style="color:{series.color}"><b>{point.y}</b> ' + units + ' ({point.percentage:.0f}%)<br/></span>'
                };

              }

              // Generate a Column Graph
              else if ($this.hasClass('js-chart-vertical-bar')) {
                this_chart.chart.type = 'column';
                this_chart.yAxis.allowDecimals = false;
              }

              // Generate a Bar graph
              else if ($this.hasClass('js-chart-horizontal-bar')) {
                this_chart.chart.type = 'bar';
                this_chart.yAxis.allowDecimals = false;
                this_chart.tooltip = {
                  formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                      this.point.y + ' ' + units;
                  }
                };
              }


              // Generate a Line Graph
              else if ($this.hasClass('js-chart-line')) {
                this_chart.chart.type = 'line';
                this_chart.yAxis.allowDecimals = false;
                this_chart.yAxis.crosshair = {
                  width: 1
                };

                this_chart.tooltip = {
                  pointFormat: '<span style="color:{series.color}">{series.name}: </span><b>{point.y}</b> ' + units + ' <br/></span>',
                  shared: true,
                  crosshairs: true
                };
              }

              // Generate a stacked column chart
              else if ($this.hasClass('js-chart-stacked')) {
                this_chart.chart.type = 'column';
                this_chart.chart.lineWidth = 3;
                this_chart.chart.marker = {
                  radius: 0
                };
                this_chart.yAxis.stackLabels = {
                    enabled: false
                };
                this_chart.plotOptions = {
                  column: {
                    stacking: 'normal',
                    dataLabels: {
                      enabled: false
                    }
                  }
                };
                this_chart.tooltip = {
                  formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                      this.point.y + ' ' + units;
                  }
                };
              }

              // Generate a percentage based stacked column chart
              else if ($this.hasClass('js-chart-stacked-100')) {
                this_chart.chart.type = 'column',
                this_chart.chart.lineWidth = 3,
                this_chart.chart.marker = {
                  radius: 0
                }
                this_chart.yAxis.stackLabels = {
                    enabled: false
                };
                this_chart.plotOptions = {
                  column: {
                    stacking: 'percent',
                    dataLabels: {
                      enabled: false
                    }
                  }
                };
                this_chart.tooltip = {
                  pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ' + units + ' ({point.percentage:.0f}%)<br/>'
                };
              }

              // Invert rows and columns on graph if the checkbox is checked.
              if ($this.hasClass('highcharts-switch-rows-columns')) {
                this_chart.data.switchRowsAndColumns = true
              }

              var my_chart = new Highcharts.chart($table.attr('id') + '-chart', this_chart);

              // Create a double axis chart.
              if (double_axis) {
                my_chart.series[0].update({
                  name: yaxis,
                  yAxis: 0
                });
                my_chart.series[1].update({
                  name: yaxis_secondary,
                  yAxis: 1
                })
              }

              // Hide the table if the checkbox is checked.
              if ($this.hasClass('js-chart-replace-table')) {
                $table.hide('fast');
              }

              // Add fullscreen button if checkbox is checked.
              if ($this.hasClass('tablefield--show-fullscreen-button')) {
                var chart_button = document.createElement('div');
                chart_button.className = 'fs-button';
                var button_id = chart_id.concat('--fsbutton');
                chart_button.innerHTML = '<a href="#" id="'.concat(button_id,'"></a>');
                document.getElementById(chart_id).prepend(chart_button);
                $('#' + button_id).click(function(){
                  $('#' + chart_id).toggleClass('chart-fullscreen');
                  $('body').toggleClass('fs-display');
                });
              }
            });
          }
        }
      }
    }
  };
})(jQuery, Drupal);
