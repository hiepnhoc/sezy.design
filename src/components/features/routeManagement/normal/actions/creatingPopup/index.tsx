import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_DUALTABLE_MOVE, SELECT_COMBOX, INPUT_DATE_FROM_CREATING, INPUT_DATE_TO_CREATING, REQUEST_CREATING, REQUEST_QUERY, SEARCH_PERS, SELECT_DUALTABLE_CONTENT_ROW, SET_POPUP_TYPE, CHANGE_CREATING_INPUT, HANDLE_SPECIAL_DELETE, HANDLE_SPECIAL_ADD, REQUEST_CREATING_CANCEL, FETCH_PYC, CHANGE_VEHICLE_INPUT, REQUEST_PERS, } from '~stores/routeManagement/normal/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Datepicker from "~commons/datepicker";
import * as DualTable from "~commons/dualTable";
import { getCurrentDate } from "@utils";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import moment from 'moment';
import { color } from '@storybook/theming';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const {
    setIsShown,
  } = props;

  const selector = useSelector(state => state['routeManagement'].creatingPopup);
  const dispatch = useDispatch();
  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector);
    if (isValidForm) {
      dispatch({ type: REQUEST_CREATING });
      // dispatch({ type: REQUEST_CREATING_CANCEL });
      if (setIsShown)
        setIsShown(false)
    }
  }

  const submitButtonProps: Button.Props = {
    text: 'Create',
    margin: Base.MarginRight.PX_28,
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.GREEN,
    onClick: handleSubmitButtonClick,
  }

  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
    // onClick: () => dispatch({ type: REQUEST_CREATING_CANCEL }),
  }


  return (
    <Popup.Element
      {...props}
      closePopUpCallback={() => dispatch({ type: REQUEST_CREATING_CANCEL })}
    >
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Số PYC HT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
        />
      </Block.Element>
      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên ĐVTLT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['auth', 'user', 'orgsName'],
            reducerType: '',
          }}
        />
      </Block.Element>

      <DualTable.Element
        type={DualTable.Type.BLOCK}
        titleCallback1={titleCallback}
        titleCallback2={titleCallback}
        cellMapping1={cellMapping(dispatch)}
        cellMapping2={cellMapping(dispatch)}
        store={{
          selector1Keys: ['routeManagement', 'creatingPopup', 'tableContent1'],
          selector2Keys: ['routeManagement', 'creatingPopup', 'tableContent2'],
          row1ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 1, tableType: 1 },
          row2ClickAction: { type: SELECT_DUALTABLE_CONTENT_ROW, popupType: 1, tableType: 2 },
          handleMoveActionType: HANDLE_DUALTABLE_MOVE,
        }}
        actionButtons={{
          oneRightToLeft: {
            text: 'Add',
            disabled: false,
          },
          oneLeftToRight: {
            text: 'Remove',
            disabled: false,
          },
          allRightToLeft: {
            disabled: true,
          },
          allLeftToRight: {
            disabled: true,
          },
        }}
        margin={Base.MarginBottom.PX_28}
        pagination={{
          store:{
            totalSelectorKeys: ['routeManagement', 'creatingPopup'],
            action: {
              type: REQUEST_PERS,
            }
          },
          style:{
            marginTop: '5px',
          }
        }}
      />

      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Thời gian bắt đầu lộ trình (dd/mm/yyyy hh:mm:ss AM/PM)' {...inputTitleProps} />
        <Input.Element
          placeholder=''
          {...inputProps}
          store={{
            selectorKeys: ['routeManagement', 'creatingPopup', 'startTime'],
            reducerType: CHANGE_VEHICLE_INPUT,
          }}
        />
      </Block.Element>


      <Block.Element {...inputWrapperProps}>
        <Title.Element text='Tên thủ quỹ ĐVTLT' {...inputTitleProps} />
        <Input.Element
          valueType={Input.ValueType.NUMBER}
          placeholder=''
          {...inputProps}
          isDisabled={true}
          store={{
            selectorKeys: ['auth', 'user', 'fullname'],
            reducerType: '',
          }}
        />
      </Block.Element>

      <Block.Element
        {...actionsWrapperProps}
        margin={Base.MarginTop.PX_38}
      >
        <Block.Element >
        </Block.Element>
        <Block.Element {...actionsProps}>
          <Button.Element
            {...submitButtonProps}
            flexGrow={Base.FlexGrow.G1}
          />
          <Button.Element
            {...closeButtonProps}
            flexGrow={Base.FlexGrow.G1}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['routeManagement', 'create', 'isShown'],
                value: false,
              }
            }}
          />
        </Block.Element>
      </Block.Element>
    </Popup.Element>
  )
}

const inputWrapperProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
  margin: Base.MarginBottom.PX_18,
}

const inputTitleProps: Title.Props = {
  width: Base.Width.PER_30,
}

const inputProps: Input.Props = {
  width: Base.Width.PER_70,
}

const actionsWrapperProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
}

const actionsProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
  width: Base.Width.PER_70,
}

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const titleCallback = () => ([
  {
    ...tableData_$rows_$cells_title,
    children: 'STT',
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Số PYC HT',
    sort: {
      type: REQUEST_QUERY,
      data: 'id',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Trạng thái PYC',
    sort: {
      type: REQUEST_QUERY,
      data: 'id',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Mức độ ưu tiên',
    sort: {
      type: REQUEST_QUERY,
      data: 'co_orgs_name',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Khoảng cách ĐVĐQ với ĐVYCĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'pers_fullname',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Mô hình điều quỹ',
    sort: {
      type: REQUEST_QUERY,
      data: 'receiver_pers_fullname',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Tên ĐVYCĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_from_date',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Họ và tên thủ quỹ ĐVYCĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_to_date',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'SĐT Thủ quỹ ĐVYCĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Tên ĐVĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Họ và tên Thủ quỹ ĐVĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'SĐT thủ quỹ ĐVĐQ',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  {
    ...tableData_$rows_$cells_title,
    children: 'Thông tin chi tiết HĐB',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Loại yêu cầu',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'loại tiền',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'loại vàng',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Số lượng HĐB',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Đặc điểm',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Tên ATM',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  // {
  //   ...tableData_$rows_$cells_title,
  //   children: 'Tên NH đối tác KPP mở TK',
  //   sort: {
  //     type: REQUEST_QUERY,
  //     data: 'authority_status',
  //   }
  // },
  {
    ...tableData_$rows_$cells_title,
    children: 'Số PYC DV',
    sort: {
      type: REQUEST_QUERY,
      data: 'authority_status',
    }
  },
]);

const cellMapping = (dispatch) => (item, index) => ([
  {
    children: index + 1,
  },
  {
    children: item.id,
  },
  {
    children: item.cashOptimizationStatus,
  },
  {
    children: item.priorityLevelName,
  },
  {
    children: item.cashOptimizationOrgsDetailModel?.distanceOrgsToOrgsRequest,
  },
  {
    children: item.model,
  },
  {
    children: item.orgsName,
  },
  {
    children: item.orgsHolderName,
  },
  {
    children: item.orgsHolderMobile,
  },
  {
    children: item.orgsDestName,
  },
  {
    children: item.tqDvdqName,
  },
  {
    children: item.tqDvdqMobile,
  },
  {
    children: <a
      style={{
        color: 'blue',
        cursor: 'pointer',
      }}
      onClick={() => dispatch({
        type: HANDLE_POPUP,
        keys: ['routeManagement', 'special', 'isShown'],
        value: true,
      })} >Link</a>,
  },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.type,
  // },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.currencyType
  // },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.goldType,
  // },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.quanlity
  // },
  // {
  //   // children: (item.cashOptimizatioDetailModelList)[0]?.attribute,
  // },
  // {
  //   children: item.cashOptimizationOrgsDetailModel?.atmCdmName,
  // },
  // {
  //   children: item.cashOptimizationOrgsDetailModel?.nnhnTctdName,
  // },
  {
    children: item.orgsRequestId,
  },
]);

const validateForm = (dispatch, selector) => {
  if (!moment(selector.startTime, 'DD/MM/YYYY hh:mm:ss A', true).isValid()) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Sai Thời gian bắt đầu lộ trình (dd/mm/yyyy hh:mm:ss AM/PM)' } });
    return false;
  }
  return true;
}





export default Element;
Element.displayName = 'CreatingPopup'
