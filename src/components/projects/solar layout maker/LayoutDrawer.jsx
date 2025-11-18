import * as d3 from 'd3';
import {useMemo, useEffect, useRef} from 'react';
import LayoutCalculator from './layout-calculator';

export default function LayoutDrawer({
  psh, 
  totalSystemEnergy, 
  lat, 
  planeLength,
  planeWidth, 
  maxPlaneVolt, 
  maxPlaneCurr, 
  planePower, 
  maxInvVolt, 
  minInvVolt, 
  maxInvCurr, 
  invPower
}) {
  const containerRef = useRef(null);
  const calc = useMemo(() => {
    try {
      return new LayoutCalculator(
        psh, totalSystemEnergy, lat, planeLength, maxPlaneVolt, maxPlaneCurr, planePower, maxInvVolt, minInvVolt, maxInvCurr, invPower
      );  
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [psh, totalSystemEnergy, lat, planeLength, maxPlaneVolt, maxPlaneCurr, planePower, maxInvVolt, minInvVolt, maxInvCurr, invPower]);

  if (!calc) return <p class="text-danger">Invalid input - check console</p>
  try { calc.checkingLimits(); } catch (e) { return <p class="text-danger">{e.message}</p>}

  console.log(calc.planeNumber(), calc.invNumber(), calc.planeStringNumber());
  
  console.log('Actual Plane String Number: ', calc.actualPlaneParalallelNumber(), 'Excess Plane Number: ', calc.excessPlaneNumber());

  useEffect(() => {
    if (!calc) return;

    const renderGrid = () => {

      const container = d3.select(containerRef.current); container.selectAll('*').remove(); // creating the container then to clear previous SVG
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const containerHeight = 500;
      const totalPlanes = calc.planeNumber();  
      const margin = { top: totalPlanes > 10 ? 50 : 80, right: 40, bottom: totalPlanes > 10 ? 40 : 100, left: totalPlanes > 10 ? 40 : 80}
      const h = containerHeight;
      const w = containerWidth;
      const width = w - margin.left - margin.right;
      const height = h - margin.top - margin.bottom;

      
      const rows = calc.actualPlaneParalallelNumber();
      const cols = Math.floor(totalPlanes / rows);
      const worldWidth = (cols - 1) * calc.minimumDistance() + planeLength;
      const worldHeight = rows * planeWidth;

      const dataset = Array.from({length: totalPlanes}, (_, i) => ({ x: i % cols, y: Math.floor(i / cols) })); // [{x:0,y:0}, {x:1,y:0}, ..., {x:11,y:9}] if 12 cols × 10 rows

      const svg = container
      .append('svg')
      .attr('width', '100%')
      .attr('height', h)
      .attr('viewBox', `0 0 ${containerWidth} ${h}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');
          
      const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

      const xScale = d3.scaleLinear().domain([0, worldWidth]).range([0, width]);
      const yScale = d3.scaleLinear().domain([0, worldHeight]).range([0, height]);

      const planePixelLength = xScale(planeLength) - xScale(0);
      const planePixelWidth = yScale(planeWidth) - yScale(0);

      g.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.x * calc.minimumDistance()))
      .attr('y', d => yScale(d.y))
      .attr('width', planePixelLength)
      .attr('height', planePixelWidth)
      .attr('fill', '#0f172a');

      function addDimension(x1, y1, x2, y2, text, options = {}) {
        const { offset = 30, textOffset = 10 } = options;

        const isVertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);

        const lineX1 = isVertical ? x1 : x1 ;
        const lineY1 = isVertical ? y1 : y1 ;
        const lineX2 = isVertical ? x2 : x2 ;
        const lineY2 = isVertical ? y2 : y2 ;

        const ext1x = isVertical ? x1 : x1 ;
        const ext1y = isVertical ? y1 - offset / 2 : y2;
        const ext2x = isVertical ? x2 : x2 ;
        const ext2y = isVertical ? y2 + offset / 2 : y2;

        if (!g.select('#arrow').node()) {
          g.append('defs')
          .append('marker')
          .attr('id', 'arrow')
          .attr('viewBox', '0 0 10 10')
          .attr('refX', 8)
          .attr('refY', 5)
          .attr('markerWidth', 4)
          .attr('markerHeight', 4)
          .attr('orient', 'auto-start-reverse')
          .append('path')
          .attr('d', 'M 0 0 L 10 5 L 0 10 z')
          .attr('fill', '#333');
        }

        g.append('line')
        .attr('x1', xScale(ext1x)).attr('y1', yScale(ext1y))
        .attr('x2', xScale(ext1x)).attr('y2', yScale(ext1y))
        .attr('stroke', 'red').attr('stroke-width', 1.5);

        g.append('line')
        .attr('x1', xScale(ext2x)).attr('y1', yScale(ext2y))
        .attr('x2', xScale(ext2x)).attr('y2', yScale(ext2y))
        .attr('stroke', 'red').attr('stroke-width', 1.5);

        g.append('line')
        .attr('x1', xScale(lineX1)).attr('y1', yScale(lineY1))
        .attr('x2', xScale(lineX2)).attr('y2', yScale(lineY2))
        .attr('stroke', '#333')
        .attr('stroke-width', 2)
        .attr('marker-start', 'url(#arrow)')
        .attr('marker-end', 'url(#arrow)');
          
        const midX = (lineX1 + lineX2) / 2;
        const midY = (lineY1 + lineY2) / 2;

        g.append('text')
        .attr('x', isVertical ? xScale(midX) + textOffset: xScale(midX))
        .attr('y', isVertical ? yScale(midY) - textOffset * 2: yScale(midY) - textOffset)
        .attr('text-anchor', 'middle')
        .attr('transform', isVertical ? `translate(${xScale(midX) - 15}, ${yScale(midY)}) rotate(-90)` : null)
        .attr('font-family', 'Arial, Helvetica, sans-serif')
        .attr('font-size', '14px')
        .attr('fill', '#000')
        .text(text);
      }

      addDimension(0, -0.2, planeLength, -0.2, `${planeLength.toFixed(2)}m`, {textOffset: totalPlanes > 10 ? 4.5 : 1.5} ); //length dimension
      addDimension(0, totalPlanes > 10 ? -0.8 : -0.5, calc.minimumDistance(), totalPlanes > 10 ? -0.8 : -0.5, `${calc.minimumDistance().toFixed(2)}m`, {textOffset: totalPlanes > 10 ? 4.5 : 1.5} ); //minimumDistance dimension
      addDimension(totalPlanes > 10 ? -0.1 : -0.1, 0, totalPlanes > 10 ? -0.1 : -0.1, planeWidth, `${planeWidth.toFixed(2)}m`, { textOffset: totalPlanes > 10 ? 4.5 : 15 } ); //width dimension
    }
    // to add length, width, minimum distance legend or something, more info aswell in the summary

    renderGrid();
  }, [calc]);

  return (
    <div>
      <div>
        <h3>Layout Summary</h3>
        <ul>
          <li>Total panels: <strong>{calc.planeNumber()}</strong></li>
          <li>Strings per inverter: <strong>{calc.planeStringNumber()}</strong></li>
          <li>Parallels per inverter: <strong>{calc.actualPlaneParalallelNumber()}</strong></li>
          <li>Inverters: <strong>{calc.invNumber()}</strong></li>
          <li>Max amount of parallels per inverter: <strong>{calc.planeParallelNumber()}</strong></li>
          <li>Excess panels: <strong>{calc.excessPlaneNumber()}</strong></li>
          <li>Tilt angle: <strong>{calc.optAngle()}°</strong></li>
          <li>Start to start spacing for each 2 parallalel planes: <strong>{calc.minimumDistance().toFixed(2)}m</strong></li>
        </ul>
        <p class="form-text">Excess panels fill the first groups of parallels panels.</p>
      </div>
      <div ref={containerRef} id="canva-test" class="d-flex justify-content-center"></div>
    </div>
  )
}