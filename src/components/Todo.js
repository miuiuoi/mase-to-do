import { Button } from 'antd';
import React from 'react';
import styled, { css } from 'styled-components';
import { CheckOutlined } from '@ant-design/icons';

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

   &,
  &:hover {
    ${(p) =>
      p.isCompleted &&
      css`
        text-decoration: line-through;
      `}
  }

  &:hover {
    .check-icons {
      display: inline-block;
    }
  }

  .check-icons {
    display: none;

    &:hover {
      background-color: #e2e2e2;
      border-radius: 3px;
    }
  }
`;

export default function Todo({ todo, onCheckBtnClick }) {
  return (
    <ButtonStyled 
    isCompleted={todo.isCompleted}
      block 
      icon={
        !todo.isCompleted && (
            <span className='check-icons' onClick={()=>onCheckBtnClick(todo.id)}>
                <CheckOutlined style={{ color: '#4fff4f' }} />
            </span>
        )
      }
    >
      {todo.name}
    </ButtonStyled>
  );
}

