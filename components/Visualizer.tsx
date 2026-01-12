
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Visualizer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('width', '100%')
      .style('height', 'auto');

    svg.selectAll('*').remove();

    const nodes = [
      { id: 'User', x: 100, y: 200, label: 'Browser/User', color: '#60a5fa' },
      { id: 'Frontend', x: 300, y: 200, label: 'React App', color: '#fbbf24' },
      { id: 'API', x: 500, y: 200, label: 'API / Server', color: '#a78bfa' },
      { id: 'DB', x: 700, y: 200, label: 'Database', color: '#34d399' }
    ];

    const links = [
      { source: 'User', target: 'Frontend', label: 'Interaction' },
      { source: 'Frontend', target: 'API', label: 'Fetch Request' },
      { source: 'API', target: 'DB', label: 'Query' },
      { source: 'DB', target: 'API', label: 'Data Result' },
      { source: 'API', target: 'Frontend', label: 'JSON Response' },
      { source: 'Frontend', target: 'User', label: 'UI Update (State)' }
    ];

    // Define Arrow markers
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .append('path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#94a3b8');

    // Draw links
    const linkElements = svg.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d) => {
        const sourceNode = nodes.find(n => n.id === d.source)!;
        const targetNode = nodes.find(n => n.id === d.target)!;
        const isReturn = ['DB', 'API'].includes(d.source) && ['API', 'Frontend', 'User'].includes(d.target);
        const curve = isReturn ? 40 : -40;
        return `M${sourceNode.x},${sourceNode.y} Q${(sourceNode.x + targetNode.x) / 2},${sourceNode.y + curve} ${targetNode.x},${targetNode.y}`;
      })
      .attr('fill', 'none')
      .attr('stroke', '#475569')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    // Draw nodes
    const nodeElements = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodeElements.append('circle')
      .attr('r', 30)
      .attr('fill', d => d.color)
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 3);

    nodeElements.append('text')
      .attr('dy', 50)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f8fafc')
      .attr('font-weight', '600')
      .text(d => d.label);

    // Animation for flow
    const animateFlow = () => {
      svg.selectAll('.flow-dot').remove();
      
      svg.selectAll('.link')
        .each(function(d: any, i) {
          const path = d3.select(this).node() as SVGPathElement;
          const length = path.getTotalLength();
          
          svg.append('circle')
            .attr('class', 'flow-dot')
            .attr('r', 4)
            .attr('fill', '#fff')
            .transition()
            .delay(i * 800)
            .duration(1500)
            .attrTween('transform', () => {
              return (t) => {
                const point = path.getPointAtLength(t * length);
                return `translate(${point.x},${point.y})`;
              };
            })
            .on('end', animateFlow);
        });
    };

    animateFlow();

  }, []);

  return (
    <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 shadow-2xl">
      <h3 className="text-2xl font-bold mb-4 text-blue-400">Request Lifecycle Visualizer</h3>
      <p className="text-slate-400 mb-6">Observe how data flows between the user and the dynamic server infrastructure.</p>
      <div className="overflow-x-auto">
        <svg ref={svgRef} className="mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h4 className="font-semibold text-blue-300 mb-2">1. Client Interaction</h4>
          <p className="text-sm text-slate-400">User clicks or types, triggering a React state change or a manual fetch call.</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h4 className="font-semibold text-amber-300 mb-2">2. API Gateway</h4>
          <p className="text-sm text-slate-400">The server processes the request, authenticates the user, and prepares DB queries.</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h4 className="font-semibold text-emerald-300 mb-2">3. Persistent Storage</h4>
          <p className="text-sm text-slate-400">Data is retrieved or updated in a database (SQL or NoSQL).</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h4 className="font-semibold text-purple-300 mb-2">4. State Hydration</h4>
          <p className="text-sm text-slate-400">The browser receives JSON and updates the UI instantly without a full page reload.</p>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
