import React from 'react';
import {CardContent, Grid, Typography} from '@mui/material';
import AppCard from "../../components/shared/AppCard";
import CustomStatistic from "../../components/shared/CustomStatistic";

const Overview = () => {
    const stats_list = [
        {
            "name": "sentiment",
            "value": "Very high"
        },
        {
            "name": "predicted impact",
            "value": "Low"
        },
        {
            "name": "Impact horizon",
            "value": "Long-term"
        }, {
            "name": "sentiment",
            "value": "Very high"
        },
        {
            "name": "predicted impact",
            "value": "Low"
        },
        {
            "name": "Impact horizon",
            "value": "Long-term"
        }
    ]
    return (
        <>


            <AppCard>

                <Grid container spacing={5}>

                    {stats_list.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <CustomStatistic name={capitalizeFirstLetter(stat.name)} value={stat.value}/>
                        </Grid>
                    ))}
                </Grid>
            </AppCard>

        </>

    )
        ;
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Overview;
