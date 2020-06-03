<template>
  <div>
    <div class="top-bar">
         <BreadcrumbNavigation></BreadcrumbNavigation>
    </div>
    <div class="content-container">
        <div  id="histogram"></div>
    </div>
  </div> 
</template>
<script>
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation.vue'
import * as d3 from 'd3';

export default {
    components:{
        BreadcrumbNavigation
    },
    data(){
        return{
            dataset:[{
                date:'Mon',
                value:'24'
            },{
                date:'Tue',
                value:'28'
            },{
                date:'Wed',
                value:'20'
            },{
                date:'Thu',
                value:'34'
            },{
                date:'Fri',
                value:'55'
            },{
                date:'Sat',
                value:'4'
            },{
                date:'Sun',
                value:'34'
            }]
        }
    },
    mounted(){
        this.histogram();
    },
    methods:{
        histogram(){
            // var dataset = [10,20,30,23,13,40,27,35,20];
            var marge = {top:60,bottom:60,left:60,right:60}
            let width=500,height=500;
            const svg = d3.select('#histogram')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
            var g = svg.append("g")
            .attr("transform","translate("+marge.top+","+marge.left+")");
            // 设置比例尺，domain为定义域，range为值域
            var xScale = d3.scaleBand()
                .domain(this.dataset.map((d) => d.date))
                .rangeRound([0,width-marge.left-marge.right]);
        // x轴调用比例尺，在下方
            var xAxis = d3.axisBottom(xScale);
                
            var yScale = d3.scaleLinear()
                .domain([0,d3.max(this.dataset, (d) => d.value)])
                .range([height-marge.top-marge.bottom,0]);//y轴数值0在最下方，对应的值域为最大值，值域类似于从上到下的高度
            var yAxis = d3.axisLeft(yScale);

            g.append("g")
                .attr("transform","translate("+0+","+(height-marge.top-marge.bottom)+")")
                .call(xAxis);
            g.append("g")
                .attr("transform","translate(0,0)")
                .call(yAxis);
            //绘制矩形和文字
            var gs = g.selectAll(".rect")
                .data(this.dataset)
                .enter()
                .append("g");
            
            // 绘制矩形
            var rectPadding = 20;//矩形之间的间隙
            gs.append("rect")
                .attr("x",function(d,i){
                    return xScale(d.date)+rectPadding/2;
                })	
                .attr("y",function(d){
                    return yScale(d.value);   //x,y为绘制矩形时左上方点的x,y轴数据
                })
                .attr("width",function(){
                    return xScale.step()-rectPadding;
                })
                .attr("height",function(d){
                    return height-marge.top-marge.bottom-yScale(d.value);
                })
                .attr("fill","steelblue");
                // 绘制文字
            gs.append("text")
                .attr("x",function(d,i){
                    return xScale(d.date)+rectPadding/2;
                })
                .attr("y",function(d){
                return yScale(d.value);
                })
                .attr("dx",function(d){
                    return (xScale.bandwidth() - rectPadding*2)/2;
                })
                .attr('fill','#fff')
                .attr("dy",20)
                .text(function(d){
                    return d.value;
                })
             let toolTips = d3.select('body').append('div')
                .attr('class', 'toolTips')
                .style('opacity', 0)
                .style('position', 'absolute')   
             gs.on('mouseover', function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', '0.8')
             })
             .on('mousemove', function (d) {
                // 这里取得是相对屏幕的坐标，因为tooltip元素放在body中
                let mouseX = d3.event.clientX + 15
                let mouseY = d3.event.clientY - 15
                // 如果你的style用了scoped，那你的样式应该写到App.vue中去，否则插入元素的样式不会生效
                toolTips.html(`<div class="tolTp">${d.value}</div>`)
                .style('opacity', 1)
                .style('left', mouseX + 'px')
                .style('top', mouseY + 'px')
            })
            .on('mouseout', function (d, i) {
                toolTips.style('opacity', 0)
                toolTips.html('')
                d3.select(this)
                .transition()
                .duration(500)
                .attr('opacity', '1')
            })
        } 
    }   
}   
</script>
<style scoped>
.content-container{
    min-height: calc(100vh - 200px);
}
.histogram{
    width:400px;
    height: 400px;
}
.tolTp{
  padding:8px 12px;
  background: rgba(0, 0, 0, 0.7);
  color:white;
}
</style>
