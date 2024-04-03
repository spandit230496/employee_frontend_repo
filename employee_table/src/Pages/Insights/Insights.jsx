import React, { useState, useEffect } from 'react';
import ChartModal from '../../Components/Modal/ChartModal';
import ChartDetailsModal from '../../Components/Modal/ChartDetailsModal';

const Insights = () => {
  const [firstModalOpen, setFirstModalOpen] = useState(true);
  const [secondModalOpen, setSecondModalOpen] = useState(false);



  const handleFirstModalClose = () => {
    setFirstModalOpen(false);
  };
  const chartClicked = () => {
    setSecondModalOpen(true);
    setFirstModalOpen(false);
  };
  const handleSecondModalClose = () => {
    setSecondModalOpen(false);
  };

  return (
    <div>
      <ChartModal open={firstModalOpen} handleClose={handleFirstModalClose} firstOpen={setFirstModalOpen}  secondOpen={setSecondModalOpen} chartClicked={chartClicked} />
      <ChartDetailsModal open={secondModalOpen} handleClose={handleSecondModalClose} firstOpen={setFirstModalOpen}  secondOpen={setSecondModalOpen} chartClicked={chartClicked}/>
    </div>
  );
};

export default Insights;
