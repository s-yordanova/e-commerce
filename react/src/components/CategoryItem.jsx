import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";

const DropDownContent = styled.div`
  display: none;
  left: 0;
  margin: 20px 0;
  position: absolute;
  background-color: #fbfbfb;
  min-width: 160px;
  z-index: 9999;
  a:link{
    text-decoration: none;
  }
`;

const Container = styled.div`
  padding: 20px 20px 20px 20px;
  cursor: pointer;
  position: relative;
  display: inline-block;

  &:hover ${DropDownContent} {
    display: block;
  }

  &:hover {
    background-color: #fbfbfb;
  }
`;

const Title = styled.h1`
  color: black;
  font-size: 20px;
  font-weight: 500;
  ${mobile({ fontSize: "14px" })}
`;

const DropDownItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  
  &:hover {
    background-color: #ddd;
  }
`;


const CategoryItem = ({ item }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Title>{t(item.title)}</Title>
      <DropDownContent>
        {item.categ.map((elem, index) => ( item.title !=="-50% SALE"?
        <Link key={index} to= {`/products/${item.title.toLowerCase()}/${elem}`}> 
        <DropDownItem
          key={`${index}${elem}`}
        >
          {t(elem)}
        </DropDownItem>
        </Link> : <Link key={index + item.title} to= {`/products/${elem}/${elem}`}> 
        <DropDownItem
          key={`${item.title}${elem}`}
        >
          {t(elem)}
        </DropDownItem>
        </Link>
        ))}
      </DropDownContent>
     
    </Container>
  );
};

export default CategoryItem;
