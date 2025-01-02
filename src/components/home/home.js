import React from 'react'
import DatePicker from "react-datepicker";
import { currency } from '../../constants/values';
import { connect } from 'react-redux';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

import "react-datepicker/dist/react-datepicker.css";
import Price from '../global/price';

const Home = (props) => {
  const renderDate = () => {
    return (
      <div className='d-flex justify-content-evenly align-items-center'>
        <div className='d-flex align-items-center gap-2'>
          <span>Bắt đầu:</span>
          <DatePicker selected={props.state.startDate} onChange={(date) => props.parent.onChangeDate('startDate', date)} />
        </div>
        <div className='d-flex align-items-center gap-2'>
          <span>Kết thúc:</span>
          <DatePicker selected={props.state.endDate} onChange={(date) => props.parent.onChangeDate('endDate', date)} />
        </div>
      </div>
    )
  }
  const renderTotal = () => {
    return (
      <div className='d-flex align-items-center gap-2 pt-md-3 pt-2 justify-content-end'>
        <span className='heading-large'>Tổng doanh thu</span>
        <span className='heading-large'>{props.totalRevenue}<sup>{currency}</sup></span>
      </div>
    )
  }
  const renderChart = () => { 
    const aggregatedData = props.revenue?.reduce((acc, item) => {
      const date = new Date(item.date_complete).toLocaleDateString("vi-VN");
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += item.total;
      return acc;
    }, {});
    
    let labels = Object.keys(aggregatedData);
    let data = Object.values(aggregatedData);
    
    labels = labels.sort((a, b) => {
      const dateA = new Date(a.split("/").reverse().join("-"));
      const dateB = new Date(b.split("/").reverse().join("-"));
      return dateA - dateB;
    });
    
    data = labels.map((label) => aggregatedData[label]);
    
    const chartData = {
      labels,
      datasets: [
        {
          label: `Tổng doanh thu ${currency}`,
          data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: true,
        },
      ],
    };
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Ngày",
          },
        },
        y: {
          title: {
            display: true,
            text: `Tổng doanh thu (${currency})`,
          },
        },
      },
    };    
  
    return (
      <div className='pt-md-3 pt-2 overflow-x-auto'>
        <Line data={chartData} options={options} />;
      </div>
    )
  }
  const renderTopSellingHeader = () => {
    return (
      <div className='row w-100 mx-auto'>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Số thứ tự</span>
        </div>
        <div className='col-8 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Sản phẩm</span>
        </div>
        <div className='col-2 secondary-bg d-flex align-items-center py-md-2 py-1'>
          <span className='heading-small color-theme'>Số lượt mua</span>
        </div>
      </div>
    )
  }
  const renderTopSellingItem = (item, index) => {
    let url_image = '/img/placeholder-image.png'
    if (item.product.img && item.product.img.length > 0) {
      url_image = item.product.img[0]
    }
    return (
      <div className='row border-bottom w-100 mx-auto'>
        <div className='col-2 d-flex align-items-center py-md-2 py-1'>
          <span>{index + 1}</span>
        </div>
        <div className='col-8 d-flex align-items-center py-md-2 py-1 gap-md-3 gap-2'>
          <img className='image-in-grid' src={url_image}></img>
          <div>
            <div>
              <span className='heading'>{item.product.name}</span>
            </div>
            <div>
              <Price price={item.product.price} sales={item.product.sales}/>
            </div>
            <div>
              <span><span className='heading-small'>Thể loại: </span>{item.product.category}</span>
            </div>
            <div>
              <span><span className='heading-small'>Tác giả: </span>{item.product.author}</span>
            </div>
            <div>
              <span><span className='heading-small'>Nhà sản xuất: </span>{item.product.publisher}</span>
            </div>
          </div>
        </div>
        <div className='col-2 d-flex align-items-center py-md-2 py-1 gap-2 gap-md-3'>
          <span>{item.selling_count}</span>
        </div>
      </div>
    )
  }
  const renderTopSelling = () => {
    const productSales = {};

    props.revenue.forEach(order => {
      order.products.forEach(product => {
        if (productSales[product._id]) {
          productSales[product._id].selling_count += product.count;
        } else {
          productSales[product._id] = {
            selling_count: product.count,
            product: product
          };
        }
      });
    });

    const sortedSales = Object.values(productSales).sort((a, b) => b.selling_count - a.selling_count);
    const limitedTopSellingProducts = sortedSales.length > 10 ? sortedSales.slice(0, 10) : sortedSales;

    if (props.revenue.length > 0) {
      return (
        <div className=''>
          <div className='pb-md-2 pb-1 pt-md-3 pt-2'>
            <span className='heading'>Danh sách bán chạy</span>
          </div>
          {renderTopSellingHeader()}
          {limitedTopSellingProducts.map((item, index) => {
            return (
              <div key={`top-selling-product${index}`}>
                {renderTopSellingItem(item, index)}
              </div>
            )
          })}
        </div>
      )
    }
    else {
      return null
    }
  }
  if(props.revenue) {
    return (
      <div className='w-100 h-100 d-flex flex-column'>
        <div className='w-100 flex-grow-1 d-flex py-md-3 py-2 overflow-auto'>
          <div className='content-width w-100 h-fit'>
            {renderDate()}
            {renderTotal()}
            {renderChart()}
            {renderTopSelling()}
          </div>
        </div>
      </div>
    )
  }
  else {
    return null
  }
}

const mapStateToProps = state => ({
  revenue: state.homeReducers.home.revenue,
  totalRevenue: state.homeReducers.home.totalRevenue
});

export default connect(mapStateToProps, null)(Home)