import React from "react";
import WindowedSelect, {
  createFilter,
  components,
} from "react-windowed-select";
import styled from "styled-components";

// @ts-ignore
const Option = styled(components.Option)`
  &:hover {
    background-color: rgba(38, 132, 255, 0.4);
  }
`;

class CustomOption extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { innerProps, isFocused, ...otherProps } = this.props;
    const { onMouseMove, onMouseOver, ...otherInnerProps } = innerProps;
    const newProps = {
      isFocused,
      innerProps: { ...otherInnerProps },
      ...otherProps,
    };
    return (
      <Option {...newProps} className="your-option-css-class">
        {this.props.children}
      </Option>
    );
  }
}

const Components = { Option: CustomOption };
const filter = createFilter({
  ignoreCase: true,
  ignoreAccents: false,
  trim: false,
});

export const FasterSelect: React.FC<any> = (props) => {
  return (
    <WindowedSelect
      {...props}
      isSearchable
      components={Components}
      filterOption={filter}
    />
  );
};
