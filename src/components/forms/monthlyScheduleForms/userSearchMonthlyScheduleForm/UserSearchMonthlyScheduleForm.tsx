import { Grid, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';
import ManualMonthSelection from './ManualMonthSelection';
import ManualYearSelection from './ManualYearSelection';

interface UserSearchMonthlyScheduleFormProps {
    monthOnChangeHandler: (event: SelectChangeEvent) => void;
    yearOnChangeHandler: (event: SelectChangeEvent) => void;
    month: number;
    year: number;
}

const UserSearchMonthlyScheduleForm: FC<UserSearchMonthlyScheduleFormProps> = ({
    monthOnChangeHandler,
    yearOnChangeHandler,
    year,
    month,
}) => {
    return (
        <Grid
            container
            alignItems={'center'}
            width={'100%'}
            gap={2}
        >
            <Grid
                container
                item
                md={6}
                xs={12}
                spacing={2}
            >
                <Grid
                    item
                    md
                    xs
                >
                    <ManualMonthSelection
                        value={month}
                        onChangeHandler={monthOnChangeHandler}
                    />
                </Grid>
                <Grid
                    item
                    md
                    xs
                >
                    <ManualYearSelection
                        value={year}
                        onChangeHandler={yearOnChangeHandler}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserSearchMonthlyScheduleForm;
