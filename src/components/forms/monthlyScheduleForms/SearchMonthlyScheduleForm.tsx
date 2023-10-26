import { FC } from 'react';
import MonthSelection from './MonthSelection';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import YearSelection from './YearSelection';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import DangerButton from '../../common/buttons/DangerButton';
import { useAppSelector } from '../../../store/index.store';

const SearchMonthlyScheduleForm: FC = () => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { monthlyDutySchedules } = useAppSelector(
        (state) => state.monthlyScheduleSlice.records,
    );

    const generateButtonOnClickHandler = () => {};
    const deleteButtonOnClickHandler = () => {};

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
                    <MonthSelection />
                </Grid>
                <Grid
                    item
                    md
                    xs
                >
                    <YearSelection />
                </Grid>
            </Grid>
            <Grid
                container
                item
                md={5}
                xs={12}
                justifyContent={'flex-start'}
                spacing={isMediumScreen ? 2 : 1}
            >
                <Grid
                    item
                    md={'auto'}
                    sm={6}
                >
                    <PrimaryButton
                        onClickHanlder={generateButtonOnClickHandler}
                        style={{ width: isMediumScreen ? '100%' : 'auto' }}
                        disabled={monthlyDutySchedules.length > 0}
                    >
                        Generate
                    </PrimaryButton>
                </Grid>
                <Grid
                    item
                    md={'auto'}
                    sm={6}
                >
                    <DangerButton
                        onClickHanlder={deleteButtonOnClickHandler}
                        style={{ width: isMediumScreen ? '100%' : 'auto' }}
                        disabled={monthlyDutySchedules.length === 0}
                    >
                        Delete
                    </DangerButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SearchMonthlyScheduleForm;
