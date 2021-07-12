import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import { FETCH_AREAS, FETCH_CONFIG, FETCH_FUNCTIONS, FETCH_ORGS, FETCH_PERS, FETCH_REGIONS } from '_/stores/dashboardRoot/constants';
import { AuthRoute, RoleRoute } from '@hocs';
import * as Base from '~/_settings';
import * as Login from '~features/login';
import * as Register from '~features/register';
import * as FirstChangePassword from '~features/firstChangePassword';
import * as Main from '~commons/main';
import * as Breadcrumbs from '~commons/breadcrumbs';
import * as Notification from '~commons/notification';
import * as DashboardMenu from '~features/dashboardMenu';
import * as ORGS from '~features/category/ORGS';
import * as ATM_CDM from '~features/category/ATM_CDM';
import * as NHNN_TCTD from '~features/category/nhnnTctd';
import * as Vehicle from '~features/category/vehicle';
import * as Person from '~features/category/person';
import * as Title from '~features/category/title';
import * as Currency from '~features/category/currency';
import * as Priority from '~features/category/priority';
import * as Region from '~features/category/region';
import * as Area from '~features/category/area';
import * as Function from '~features/category/function';
import * as Registration from '~features/authority/registration';
import * as Approval from '~features/authority/registration/approval';
import * as PYCRegistration from '~features/pyc/registration';
import * as PYCApproval from '~features/pyc/registration/approval';
import * as ChangePassword from '~features/user/changePassword';
import * as AssignRole from '~features/user/assignRole';
import * as ResetPassword from '~features/user/resetPassword';
import { FETCH_ROLES, FETCH_USER } from '_/stores/auth/constants';
import { useCooke } from '_/hooks';

export type Props = {
}

export const Element = (props: Props) => {
    const {
    } = props;
    const { cookie: accessToken } = useCooke('accessToken');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: FETCH_CONFIG });
        dispatch({ type: FETCH_USER });
        dispatch({ type: FETCH_ROLES });
        // dispatch({ type: FETCH_AREAS });
        // dispatch({ type: FETCH_ORGS });
        // dispatch({ type: FETCH_FUNCTIONS });
        // dispatch({ type: FETCH_PERS });
        // dispatch({ type: FETCH_TITLE });
        // dispatch({ type: FETCH_REGIONS });
    }, []);
    const userSelector = useSelector(state => state['auth'].user);
    const isAuthenticated = userSelector.isAuthenticated || accessToken;

    return (
        <Router >
            <Notification.Element />
            <Switch>
                <Route path="/login" component={Login.Element} />
                <Route path="/register" component={Register.Element} />
                <Route path="/change-password" component={FirstChangePassword.Element} />
                {/* <Route path="/forgot-password" component={Forgot.Element} /> */}
                <AuthRoute path="/" component={DashboardComponent(userSelector)} isAuthenticated={isAuthenticated ? true : false} />
            </Switch>
        </Router>
    )
}

const DashboardComponent = (userSelector) => () => {

    const mainProps: Main.Props = {
        // style: {
        //     backgroundColor: '#f8f8f8',
        //     minHeight: '100%',
        // },
    };

    const breadcrumbsProps: Breadcrumbs.Props = {
        // style: {
        //     backgroundColor: '#f8f8f8',
        //     minHeight: '100%',
        // },
        mapper: breadcrumbsMapper,
    };
    return (
        <>
            <DashboardMenu.Element {...dashboardMenuProps} roleCodeList={userSelector.viewList}/>
            <Main.Element {...mainProps}>
                <Breadcrumbs.Element {...breadcrumbsProps} />
                <Switch>
                    <Route exact path="/">
                    </Route>

                    <RoleRoute path="/category/orgs" component={ORGS.Element} accessedRole='41' roles={userSelector.viewList} />
                    <RoleRoute path="/category/atm-cdm" component={ATM_CDM.Element} accessedRole='39' roles={userSelector.viewList} />
                    <RoleRoute path="/category/nhnn-tctd" component={NHNN_TCTD.Element} accessedRole='43' roles={userSelector.viewList} />
                    <RoleRoute path="/category/vehicle" component={Vehicle.Element} accessedRole='45' roles={userSelector.viewList} />
                    <RoleRoute path="/category/pers" component={Person.Element} accessedRole='49' roles={userSelector.viewList} />
                    <RoleRoute path="/category/title" component={Title.Element} accessedRole='51' roles={userSelector.viewList} />
                    <RoleRoute path="/category/currency" component={Currency.Element} accessedRole='47' roles={userSelector.viewList} />
                    <RoleRoute path="/category/priority" component={Priority.Element} accessedRole='53' roles={userSelector.viewList} />
                    <RoleRoute path="/category/region" component={Region.Element} accessedRole='55' roles={userSelector.viewList} />
                    <RoleRoute path="/category/area" component={Area.Element} accessedRole='57' roles={userSelector.viewList} />
                    <RoleRoute path="/category/function" component={Function.Element} accessedRole='59' roles={userSelector.viewList} />
                    
                    <RoleRoute path="/authority/registration" component={Registration.Element} accessedRole='31A' roles={userSelector.viewList} />
                    <RoleRoute path="/authority/approval" component={Approval.Element} accessedRole='31B' roles={userSelector.viewList} />
                    
                    <RoleRoute path="/user/change-password" component={ChangePassword.Element} accessedRole='61' roles={userSelector.viewList} />
                    <RoleRoute path="/user/assign-role" component={AssignRole.Element} accessedRole='62' roles={userSelector.viewList} />
                    <RoleRoute path="/user/reset-password" component={ResetPassword.Element} accessedRole='63' roles={userSelector.viewList} />
                    
                    <RoleRoute path="/pyc/registration" component={PYCRegistration.Element} accessedRole='1A' roles={userSelector.viewList} />
                    <RoleRoute path="/pyc/approval" component={PYCApproval.Element} accessedRole='1B' roles={userSelector.viewList} />
                    
                </Switch>
            </Main.Element>
        </>
    )
}

const breadcrumbsMapper = {
    'category': {
        _url: '',
        _name: 'Categories',
        'orgs': { _url: '/category/orgs', _name: 'ORGS', },
        'atm-cdm': { _url: '/category/atm-cdm', _name: 'ATM/CDM', },
        'nhnn-tctd': { _url: '/category/nhnn-tctd', _name: 'NHNN/TCTD', },
        'vehicle': { _url: '/category/vehicle', _name: 'Vehicle', },
        'pers': { _url: '/category/pers', _name: 'Pers', },
        'title': { _url: '/category/title', _name: 'Title', },
        'currency': { _url: '/category/currency', _name: 'Currency', },
        'priority': { _url: '/category/priority', _name: 'Priority', },
        'region': { _url: '/category/region', _name: 'Region', },
        'area': { _url: '/category/area', _name: 'Area', },
        'function': { _url: '/category/function', _name: 'Function', },
    },
    'authority': {
        _url: '',
        _name: 'Quản lý Ủy quyền',
        'registration': { _url: '/authority/registration', _name: 'Đăng ký Ủy quyền', },
        'approval': { _url: '/authority/approval', _name: 'Kiểm soát Ủy quyền', },
    },
    'user': {
        _url: '',
        _name: 'User',
        'change-password': { _url: '/user/change-password', _name: 'Change password', },
        'assign-role': { _url: '/user/assign-role', _name: 'Assign role', },
        'reset-password': { _url: '/user/reset-password', _name: 'Reset password', },
    },
    'pyc': {
        _url: '',
        _name: 'Quản lý PYC Điều Quỹ',
        'registration': { _url: '/pyc/registration', _name: 'Đăng ký', },
        'approval': { _url: '/pyc/approval', _name: 'Kiểm soát & Phê duyệt', },
    },
}

const dashboardMenuProps: DashboardMenu.Props = {
    $menu: {
        $links: [
            {
                text: 'Categories',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'ORGS',
                        url: '/category/orgs',
                        accessedRole: '41',
                    },
                    {
                        text: 'ATM/CDM',
                        url: '/category/atm-cdm',
                        accessedRole: '39',
                    },
                    {
                        text: 'NHNN/TCTD',
                        url: '/category/nhnn-tctd',
                        accessedRole: '43',
                    },
                    {
                        text: 'Vehicle',
                        url: '/category/vehicle',
                        accessedRole: '45',
                    },
                    {
                        text: 'Pers',
                        url: '/category/pers',
                        accessedRole: '49',
                    },
                    {
                        text: 'Title',
                        url: '/category/title',
                        accessedRole: '51',
                    },
                    {
                        text: 'Currency',
                        url: '/category/currency',
                        accessedRole: '47',
                    },
                    {
                        text: 'Priority',
                        url: '/category/priority',
                        accessedRole: '53',
                    },
                    {
                        text: 'Region',
                        url: '/category/region',
                        accessedRole: '55',
                    },
                    {
                        text: 'Area',
                        url: '/category/area',
                        accessedRole: '57',
                    },
                    {
                        text: 'Function',
                        url: '/category/function',
                        accessedRole: '59',
                    },
                ],
            },
            {
                text: 'Quản lý Ủy quyền',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'Đăng ký Ủy quyền',
                        url: '/authority/registration',
                        accessedRole: '31A',
                    },
                    {
                        text: 'Kiểm soát Ủy quyền',
                        url: '/authority/approval',
                        accessedRole: '31B',
                    },
                ]
            },
            {
                text: 'User',
                $icon: {
                    name: 'user',
                },
                $subs: [
                    {
                        text: 'Change password',
                        url: '/user/change-password',
                        accessedRole: '61',
                    },
                    {
                        text: 'Assign role',
                        url: '/user/assign-role',
                        accessedRole: '62',
                    },
                    {
                        text: 'Reset password',
                        url: '/user/reset-password',
                        accessedRole: '63',
                    },
                ]
            },
            {
                text: 'Quản lý PYC Điều Quỹ',
                $icon: {
                    name: 'documentCheck',
                },
                $subs: [
                    {
                        text: 'Đăng ký ',
                        url: '/pyc/registration',
                        accessedRole: '1A',
                    },
                    {
                        text: 'Kiểm soát & Phê duyệt',
                        url: '/pyc/approval',
                        accessedRole: '1B',
                    },
                ]
            },
        ],
    },
    style: {
        backgroundColor: '#1e3f96',
    }
};