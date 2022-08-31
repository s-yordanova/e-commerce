import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { userRequest } from '../../requestMethods';
import './featuredInfo.css'

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <div className='featured'>
      <div className="featuredItem">
        <span className="feturedTitle">Revenue</span>
        <div className="feturedMoneyContainer">
          <span className="featuredMoney">{income[0]?.total} лв</span>
          <span className="featuredMoneyRate">
            {Math.floor(perc)}% {" "} 
            {perc < 0 ?(
            <ArrowDownward className='featuredIcon negative'/>
            ) : <ArrowUpward className='featuredIcon' />}
            </span>
        </div>
        <span className="featuredSub">Comapre to last month</span>
      </div>
      <div className="featuredItem">
        <span className="feturedTitle">Sales</span>
        <div className="feturedMoneyContainer">
          <span className="featuredMoney">150.90 лв</span>
          <span className="featuredMoneyRate">
            -25.90 лв <ArrowDownward className="featuredIcon negative"/>
            </span>
        </div>
        <span className="featuredSub">Comapre to last month</span>
      </div>
      <div className="featuredItem">
        <span className="feturedTitle">Cost</span>
        <div className="feturedMoneyContainer">
          <span className="featuredMoney">15.90 лв</span>
          <span className="featuredMoneyRate">
            10.90 лв <ArrowUpward className='featuredIcon' />
            </span>
        </div>
        <span className="featuredSub">Comapre to last month</span>
      </div>
    </div>
  )
}

export default FeaturedInfo