import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Box, CardContent, Grid, Stack, Typography} from '@mui/material';
import axios from 'axios';

import icon2 from '../../assets/images/svgs/icon-user-male.svg';
import icon4 from '../../assets/images/svgs/icon-mailbox.svg';
import icon5 from '../../assets/images/svgs/icon-favorites.svg';
import icon6 from '../../assets/images/svgs/icon-speech-bubble.svg';
import {BACKEND_URL} from "src/configs";
import {useTheme} from "@mui/material/styles";
import icon1Img from "../../assets/images/svgs/icon-master-card-2.svg";
import {IconArrowUpRight} from "@tabler/icons";
import Chart from "react-apexcharts";
import DashboardCard from "../../components/shared/DashboardCard";
import {
    IconAlertCircle,
} from '@tabler/icons';
import {useSelector, useDispatch} from 'react-redux';
import {fetchHomeStats} from "src/store/AnalyticsSlice";


const HomeStats = () => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const successlight = theme.palette.success.light;
    const homeStats = useSelector((state) => state.analyticsReducer.home_stats);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchHomeStats());
    }, [dispatch]);

    const optionscolumnchart = {
        chart: {
            type: 'line',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 70,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [primarylight],
            type: 'solid',
            opacity: 0,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            enabled: false,
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            x: {
                format: 'dd/MM'
            },
        },
    };


    const stats_icon_mapping = {
        'Agents': {
            href: '/user-profile',
            icon: IconAlertCircle,
        },
        'Messages': {
            href: '/apps/blog/posts',
            icon: icon6,
        },
        'Sources': {
            href: '/apps/calendar',
            icon: icon4,
        },
        'Tasks': {
            href: '/apps/email',
            icon: icon5,
        }
    };

    const cards_data = [];
    const empty_chart = [{
        name: '',
        color: primary,
        data: [],
    }]
    if (homeStats.length > 0) {
        homeStats.forEach(stat => {
            const {title, count, rate, ts_data} = stat;
            const {href, icon} = stats_icon_mapping[title];
            console.log(ts_data)

            // TODO : Figure out why chartData is not rendering when using ts_data
            cards_data.push({
                href,
                icon,
                title,
                count: count,
                rate: rate,
                chartData: [{
                    name: '',
                    color: primary,
                    data: [1,6, 2, 4, 5,3,4,10,5,6,1,8],
                }],
            });
        });
    } else {
        Object.keys(stats_icon_mapping).forEach(title => {
            const {href, icon} = stats_icon_mapping[title];
            cards_data.push({
                href,
                icon,
                title,
                count: "  ",
                rate: "  ",
                chartData: empty_chart,
            });
        });
    }

    return (
        <Grid container spacing={3} mt={3}>

            {cards_data.map((stat_card, i) => (

                <Grid item xs={12} sm={4} lg={3} key={i}>
                    <div>
                        <DashboardCard
                            title={stat_card.title}
                        >
                            <>
                                <Stack direction="row" spacing={1} alignItems="center" mb={5}>
                                    <Typography variant="subtitle1" fontWeight="500">
                                        {stat_card.count}
                                    </Typography>
                                    <Stack direction="row" spacing={1} mt={1} mb={2} alignItems="center">
                                        <Avatar sx={{bgcolor: successlight, width: 20, height: 20}}>
                                            <IconArrowUpRight width={18} color="#13DEB9"/>
                                        </Avatar>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {(parseFloat(stat_card.rate) * 100).toFixed(0) + '%'}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Chart options={optionscolumnchart}
                                       series={stat_card.chartData}
                                       type="area"
                                       height="70px"/>
                            </>
                        </DashboardCard>
                    </div>

                </Grid>
            ))}
        </Grid>
    );
};

export default HomeStats;
