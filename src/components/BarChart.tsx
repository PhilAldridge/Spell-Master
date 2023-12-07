import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
  } from 'chart.js';

  ChartJS.register(CategoryScale);
  ChartJS.register(LinearScale);
  ChartJS.register(BarElement);
  ChartJS.register(Title);
  ChartJS.register(Tooltip)

export const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Results',
      },
    },
};
  
const labels = ['Correct','Incorrect'];


function BarChart({correct, incorrect}:{correct:number, incorrect:number}) {
    const data ={
        labels,
        datasets: [{
            label: 'Results',
            data: [correct,incorrect],
            backgroundColor: ['green','red']
        }]
    }
  return (
    <Bar options={options} data={data} />
  )
}

export default BarChart