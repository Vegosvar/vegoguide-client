import React from 'react';
import { get } from 'lodash';
import {
  Dropdown,
  DropdownMenuItem,
  DropdownMenuToggle,
  Menu
} from 'components';

const DropdownMenu = ({
  className,
  onChange,
  label,
  options,
  multiple,
  value
}) => {
  const onChangeItem = newValue => {
    if (multiple) {
      if (value.includes(newValue)) {
        const newValue = value.filter(item => item !== newValue);
        return onChange(newValue);
      }

      return onChange([...value, newValue]);
    }

    return onChange(newValue);
  };

  const isSelected = option => {
    const optionValue = get(option, 'value', option);
    return multiple ? value.includes(optionValue) : value === optionValue;
  };

  const menuItems = options.map((option, index) => (
    <DropdownMenuItem
      key={index}
      option={option}
      selected={isSelected(option)}
      onChange={onChangeItem}
    />
  ));

  return (
    <Dropdown className={className}>
      <DropdownMenuToggle>{label}</DropdownMenuToggle>
      <Menu>{menuItems}</Menu>
    </Dropdown>
  );
};

export default DropdownMenu;