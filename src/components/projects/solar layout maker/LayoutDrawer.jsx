import * as d3 from 'd3';
import {useMemo, useEffect, useRef} from 'react';
import LayoutCalculator from './layout-calculator';
import { useTheme } from '@/components/Theme.jsx';

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
  const { theme } = useTheme();
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

  const validationError = useMemo(() => {
    if (!calc) return "Invalid input parameters. Check console for details.";
    try {
      calc.checkingLimits();
      return null;
    } catch (e) {
      return e.message;
    }
  }, [calc]);

  useEffect(() => {
    if (!calc || validationError || !containerRef.current) return;
    
    const renderGrid = () => {
      const container = d3.select(containerRef.current); container.selectAll('*').remove(); // creating the container then to clear previous SVG 
      const margin = { top: 80, right: 80, bottom: 80, left: 80}
      const h = 500;
      const w = containerRef.current.getBoundingClientRect().width;
      const width = w - margin.left - margin.right;
      const height = h - margin.top - margin.bottom;
      const totalPlanes = calc.planeNumber(); 
      const rows = calc.actualPlaneParalallelNumber();
      const cols = calc.invNumber() * calc.planeStringNumber();
      const gridWidth = (cols - 1) * calc.minimumDistance() + planeLength;
      const gridHeight = calc.excessPlaneNumber() > 0 ? (rows + Math.ceil(calc.excessPlaneNumber() / calc.invNumber())) * planeWidth : rows * planeWidth;

      const dataset = Array.from({length: totalPlanes}, (_, i) => ({ x: i % cols, y: Math.floor(i / cols) })); // [{x:0,y:0}, {x:1,y:0}, ..., {x:11,y:9}] if 12 cols × 10 rows

      const svg = container.append('svg').attr('width', '100%').attr('height', h).attr('viewBox', `0 0 ${w} ${h}`).attr('preserveAspectRatio', 'xMidYMid meet');
      const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);     
      
      const xScale = d3.scaleLinear().domain([0, gridWidth]).range([0, width]);
      const yScale = d3.scaleLinear().domain([0, gridHeight]).range([0, height]);
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
      .attr('fill', theme === 'light' ? '#0f172a' : '#ced4da')
      .attr('rx', 6)
      .attr('ry', 6);

      g.append('text')
        .attr('x', xScale(gridWidth / 2))
        .attr('y', -yScale(gridHeight * 0.1))
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Arial, Helvetica, sans-serif')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', theme === 'light' ? '#0f172a' : '#ced4da')
        .text('Length →');

      g.append('text')
        .attr('x', -xScale(gridWidth * 0.025))
        .attr('y', yScale(gridHeight / 2))
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Arial, Helvetica, sans-serif')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', theme === 'light' ? '#1e293b' : '#e2e8f0')
        .attr('transform', `rotate(-90, ${-xScale(gridWidth * 0.025)}, ${yScale(gridHeight / 2)})`)
        .text('← Width');

      function addDimension(x1, y1, x2, y2, text, options = {}) {
        const { offset = 30, textOffset = 10 } = options;

        const isVertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);

        const lineX1 = x1;
        const lineY1 = y1;
        const lineX2 = x2;
        const lineY2 = y2;

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
          .attr('fill', theme === 'light' ? '#1e293b' : '#e2e8f0');
        }

        g.append('line')
        .attr('x1', xScale(lineX1)).attr('y1', yScale(lineY1))
        .attr('x2', xScale(lineX2)).attr('y2', yScale(lineY2))
        .attr('stroke', theme === 'light' ? '#1e293b' : '#e2e8f0')
        .attr('stroke-width', 2)
        .attr('marker-start', 'url(#arrow)')
        .attr('marker-end', 'url(#arrow)');
          
        const midX = (lineX1 + lineX2) / 2;
        const midY = (lineY1 + lineY2) / 2;

        g.append('text')
        .attr('x', isVertical ? xScale(midX) : xScale(midX))
        .attr('y', isVertical ? yScale(midY) : yScale(midY) - textOffset)
        .attr('text-anchor', 'middle')
        .attr('transform', isVertical ? `translate(${xScale(midX) - textOffset}, ${yScale(midY/2)}) rotate(-90)` : null)
        .attr('font-family', 'Arial, Helvetica, sans-serif')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', theme === 'light' ? '#1e293b' : '#e2e8f0')
        .text(text);
      }

      addDimension(0, -gridHeight * 0.025, calc.minimumDistance(), -gridHeight * 0.025, `${calc.minimumDistance().toFixed(2)}m`); //minimumDistance dimension
    }

    renderGrid();
  }, [calc, theme]);

  if (validationError) {
    return <p className="text-danger">{validationError}</p>;
  }

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