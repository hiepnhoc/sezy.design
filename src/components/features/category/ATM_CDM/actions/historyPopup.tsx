import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_HISTORY, SELECT_HISTORY_ROW, FETCH_HISTORY_DETAIL } from '~stores/category/atmCdm/constants';
import * as Base from '~/_settings';
import * as Button from "~commons/button";
import * as Popup from "~commons/popup";
import * as Block from "~commons/block";
import * as Table from "~commons/table";
import * as Pagination from "~commons/pagination";
import { _Date, getCurrentDate } from "@utils";
import { HANDLE_BUTTON, HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Popup.Props;

export const Element = (props: Popup.Props) => {
  const dispatch = useDispatch();
  const historySelector = useSelector(state => state['atmCdm'].history);
  //create props
  const componentWrapperProps = {
    margin: Base.MarginTop.PX_28,
    style: {
      maxHeight: '500px',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    ...props,
  };
  const tableProps: Table.Props = {
    ...tableData(historySelector?.data?.map(mapResponseToData(handleRowClick(dispatch)))),
    // height: Base.Height.PX_300,
    backgroundColor: Base.BackgroundColor.WHITE,
    margin: Base.MarginBottom.PX_18,
  }

  const closeButtonProps: Button.Props = {
    text: 'Close',
    width: Base.Width.PX_200,
    color: Base.Color.WHITE,
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
  }

  const borderWrapperProps = {
    width: Base.Width.FULL,
    margin: Base.MarginBottom.PX_18,
    style: {
      overflow: 'auto',
      maxHeight: '520px',
    }
  }

  return (
    <Popup.Element {...props}>
      <Block.Element {...borderWrapperProps}>
        <Table.Element {...tableProps} />
      </Block.Element>
      <Block.Element {...actionsWrapperProps}>
        <Pagination.Element
          store={{
            totalSelectorKeys: ['atmCdm', 'history'],
            action: {
              type: FETCH_HISTORY,
            }
          }}
          style={{
            marginTop: '5px',
          }}
        />
        <Block.Element>
          <Button.Element
            {...closeButtonProps}
            store={{
              action: {
                type: HANDLE_POPUP,
                keys: ['atmCdm', 'history', 'isShown'],
                value: false,
              }
            }}
          />
        </Block.Element>
      </Block.Element>
    </Popup.Element>
  )
}

const actionsWrapperProps: Block.Props = {
  flex: Base.Flex.BETWEEN,
}

const tableData_$rows_$cells_title = {
  whiteSpace: Base.WhiteSpace.NOWRAP_ELLIPSIS,
}

const handleRowClick = (dispatch) => (item) => (e) => {
  dispatch({ type: SELECT_HISTORY_ROW, data: item });
  dispatch({ type: HANDLE_BUTTON, keys: ['atmCdm', 'historyDetail', 'isDisabled'], value: false });
}

const tableData = (queryResult?): Table.Props => ({
  $thead: [
    {
      style: {
        backgroundColor: '#1e3f96',
      },
      color: Base.Color.WHITE,
      $cells: [
        {
          ...tableData_$rows_$cells_title,
          children: 'STT',
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã ATM/CDM',
          sort: {
            type: FETCH_HISTORY,
            data: 'atmCdmCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên ATM/CDM',
          sort: {
            type: FETCH_HISTORY,
            data: 'atmCdmName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Loại máy ATM/CDM',
          sort: {
            type: FETCH_HISTORY,
            data: 'atmCdmType',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Địa chỉ ATM/CDM',
          sort: {
            type: FETCH_HISTORY,
            data: 'atmAddress',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Trạng thái ATM/CDM',
          sort: {
            type: FETCH_HISTORY,
            data: 'atmStatus',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Mã DVQL',
          sort: {
            type: FETCH_HISTORY,
            data: 'categoryOrgs.orgsCode',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Tên DVQL',
          sort: {
            type: FETCH_HISTORY,
            data: 'categoryOrgs.orgsName',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Ngày đăng ký',
          sort: {
            type: FETCH_HISTORY,
            data: 'createddate',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'NV đăng ký',
          sort: {
            type: FETCH_HISTORY,
            data: 'createdby',
          }
        },
        {
          ...tableData_$rows_$cells_title,
          children: 'Datelastmaint',
          sort: {
            type: FETCH_HISTORY,
            data: 'updateddate',
          }
        },
      ],
    },
  ],
  $rows: queryResult ? queryResult : [],
})

const mapResponseToData = (handleRowClick) => (item, index) => ({
  isSelected: item.isSelected ?? false,
  onClick: handleRowClick(item),
  $cells: [
    {
      children: index + 1,
    },
    {
      children: item.atmCdmCode,
    },
    {
      children: item.atmCdmName,
    },
    {
      children: item.atmCdmType,
    },
    {
      children: item.atmAddress,
    },
    {
      children: item.atmStatus,
    },
    {
      children: item.orgsCode,
    },
    {
      children: item.orgsName,
    },
    {
      children: item.createddate,
    },
    {
      children: item.createdbyname,
    },
    {
      children: item.updateddate,
    },
  ]
})

export default Element;
Element.displayName = 'HistoryPopup'
