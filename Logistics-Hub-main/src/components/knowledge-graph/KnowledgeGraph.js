import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Graph from 'react-graph-vis';
import Navbar from '../Navbar';

const KnowledgeGraph = () => {
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  const generateData = () => {
    const nodes = [
      { id: 1, label: 'Order Placement', color: '#3498db' },
      { id: 2, label: 'Order Processing', color: '#2ecc71' },
      { id: 3, label: 'Packing', color: '#e74c3c' },
      { id: 4, label: 'Dispatch', color: '#f39c12' },
      { id: 5, label: 'In Transit', color: '#9b59b6' },
      { id: 6, label: 'Out for Delivery', color: '#3498db' },
      { id: 7, label: 'Delivered', color: '#2ecc71' },
    ];

    const edges = [
      { id: 'e1', from: 1, to: 2, label: 'Start Processing' },
      { id: 'e2', from: 2, to: 3, label: 'Processing Complete' },
      { id: 'e3', from: 3, to: 4, label: 'Items Packed' },
      { id: 'e4', from: 4, to: 5, label: 'Dispatched' },
      { id: 'e5', from: 5, to: 6, label: 'In Transit' },
      { id: 'e6', from: 6, to: 7, label: 'Out for Delivery' },
      { id: 'e7', from: 7, to: 1, label: 'Delivered' },
    ];

    return { nodes, edges };
  };

  useEffect(() => {
    const initialData = generateData();
    setGraph(initialData);
  }, []);

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      arrows: 'to',
      scaling: {
        label: {
          enabled: true,
        },
      },
    },
    physics: {
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.05,
        nodeDistance: 120,
        damping: 0.09,
      },
      minVelocity: 0.75,
    },
  };

  return (
    <div>
        <Navbar tab={'orders'} />
        <Box height="500px">
        <Graph graph={graph} options={options} />
        </Box>
    </div>
  );
};

export default KnowledgeGraph;
