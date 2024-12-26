import React from 'react';
import SoftBox from "components/SoftBox";

function Cases() {
  const cases = [
    {
      name: 'John Doe',
      category: 'Foster Family',
      location: 'City: Bristol, District: 1',
      source: '../../../../assets/images/team-2.jpg'
    },
    {
      name: 'Emily Smith',
      category: 'Adoption',
      location: 'City: Derby, District: 2',
      source: '..\..\..\..\..\..\download-1.jpg'
    },
    {
      name: 'Michael Brown',
      category: 'Foster Care',
      location: 'City: York, District: 3',
      source: '..\..\..\..\..\..\download.jpg'
    },
    {
      name: 'Sophia Wilson',
      category: 'Residential Care',
      location: 'City: Oxford, District: 4',
      source: 'file:\\\C:\Users\MSUSERSL123\Downloads\images.jpg'
    },
  ];

  return (
    <div className="cases">
      <h2>Recently Registered Cases</h2>
      <SoftBox display="flex !important" flex-wrap= "wrap" flex-direction= "row-reverse" justify-content="space-between">
        {cases.map((caseItem, index) => (
          <div display="flex" key={index} className="case-card" padding="15px">
            <h3 color='#34A853'>{caseItem.name}</h3>
            <img src={caseItem.source} width="100" height="100"></img>
            <p>{caseItem.category}</p>
            <p>{caseItem.location}</p>
          </div>
        ))}
      </SoftBox>
    </div>
  );
}

export default Cases;
