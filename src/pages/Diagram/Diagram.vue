<template>
  <div>
    <div class="top-bar">
         <BreadcrumbNavigation></BreadcrumbNavigation>
    </div>
    <div class="content-container">
        <div  class="lineChart"></div>
        <d3line id="line" :dataset="data1"></d3line>
    </div>
  </div> 
</template>
<script>
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation.vue'
import d3line from '@/components/Line'
import * as d3 from 'd3';   
export default {
  components: { BreadcrumbNavigation,d3line},
  data() {
    return {
        data1: [
          {
            'name': '长春',
            'value': [{key: '2020-05-01', value: 10}, {key: '2020-05-02', value: 12}, {key: '2020-05-03', value: 13}, {key: '2020-05-04', value: 17}]
          },
          {
            'name': '哈尔滨',
            'value': [{key: '2020-05-01', value: 9}, {key: '2020-05-02', value: 48}, {key: '2020-05-03', value: 24}, {key: '2020-05-10', value: 49}]
          },
          {
            'name': '沈阳',
            'value': [{key: '2020-05-01', value: 30}, {key: '2020-05-02', value: 1}, {key: '2020-05-04', value: 32}, {key: '2020-05-12', value: 10}]
          }
        ]
    };
  },
  methods: {
    lineChart(){
        var margin = {top: 60, right: 60, bottom: 60, left: 60},
            width = 1200,
            height = 500;
        var svg = d3.select('.lineChart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + margin.top + ',' + margin.left + ')');
        var data = Array.apply(0, Array(31)).map(function(item, i) {
            // 产生31条数据
            i++;
            return {date: '2020-05-' + (i < 10 ? '0' + i : i), value: parseInt(Math.random() * 100)}
        });  
        console.log("data",data);  
        var parseDate = d3.timeParse("%Y-%m-%d");
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) {
                return parseDate(d.date); 
            }))
            .range([0, width - margin.left - margin.right]);
        
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d.value; })])
            .range([height- margin.top - margin.bottom, 0]);

         var xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(d => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())
            .ticks(30);  
        
        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(10);   
        // 横坐标
        svg.append('g')
            .attr('transform', 'translate(0,' + (height-margin.top-margin.bottom) + ')')
            .call(xAxis)
            .selectAll('text')
            .attr('dx', -20)
            .attr('dy', 10)
            .attr('transform', 'rotate(-20)')
            .style('font-weight', 'bold')
        
        // 纵坐标
        svg.append('g')
            .attr('class', 'y axis')
            .attr("transform","translate(0,0)")
            .call(yAxis)
            .style('font-weight', 'bold')
        var line = d3.line()
            .x(d => x(parseDate(d.date)))
            .y(d => y(d.value))
        var path = svg.append('path')
            .attr('class', 'line')
            .attr('d', line(data))
            .attr("stroke-width", 2)
            .attr('fill', 'none')
            .attr('stroke','rgb(217, 95, 2)')
        var g = svg.selectAll('circle')
            .data(data)
            .enter()
            .append('g')
            .append('circle')
            .style("fill", 'rgb(217, 95, 2)')
            .attr('cx', line.x())
            .attr('cy', line.y())
            .attr('r', 3.5)
            .on('mouseover', function() {
                d3.select(this).transition().duration(500).attr('r', 5);
            })
            .on('mouseout', function() {
                d3.select(this).transition().duration(500).attr('r', 3.5);
            });   
        var tips = svg.append('g').attr('class', 'tips');
        tips.append('rect')
            .attr('class', 'tips-border')
            .attr('width', 200)
            .attr('height', 50)
            .attr('rx', 10)
            .attr('ry', 10);
        
        var wording1 = tips.append('text')
            .attr('class', 'tips-text')
            .attr('x', 10)
            .attr('y', 20)
            .text('');
        
        var wording2 = tips.append('text')
            .attr('class', 'tips-text')
            .attr('x', 10)
            .attr('y', 40)
            .text('');   
            
        svg.on('mousemove', function() {
            var m = d3.mouse(this),//鼠标当前位置
            cx = m[0];
            var x0 = x.invert(cx);
            var i = (d3.bisector(function(d) {
                return parseDate(d.date);
            }).left)(data, x0, 1);

            var d0 = data[i - 1],
            d1 = data[i] || {},
            d = x0 - parseDate(d0.date) > parseDate(d1.date) - x0 ? d1 : d0;
        
            function formatWording(d) {
                return '日期：' + d.date;
            }
            wording1.text(formatWording(d));
            wording2.text('值：' + d.value);
        
            var x1 = x(parseDate(d.date)),
            y1 = y(d.value);
            // 处理超出边界的情况
            var dx = x1 > width ? x1 - width + 200 : x1 + 200 > width ? 200 : 0;
        
            var dy = y1 > height ? y1 - height + 50 : y1 + 50 > height ? 50 : 0;
        
            x1 -= dx;
            y1 -= dy;
            d3.select('.tips')
                .attr('transform', 'translate(' + x1 + ',' + y1 + ')');
            d3.select('.tips').style('display', 'block');
        })
        .on('mouseout', function() {
            d3.select('.tips').style('display', 'none');
        });    
    }
  },
  mounted() {
      this.lineChart();
  },
};
</script>

<style scope>
.tips{
    display: none;
}
.tips-border{
    fill:paleturquoise;
}
</style>
