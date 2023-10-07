import classes from './popup.module.scss';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import PrimaryButton from '../buttons/PrimaryButton';
import { popupSliceActions } from '../../../store/popupSlice/popupSlice';
import SecondaryButton from '../buttons/SecondaryButton';

type CloseButtonOpions =
    | {
          enableCloseButton: true;
          closeButtonTitle: string;
          closeButtonFn: () => void;
      }
    | {
          enableCloseButton?: false;
          closeButtonTitle: undefined;
          closeButtonFn: undefined;
      };

type ProceedButtonOptions =
    | {
          enableProceedButton: true;
          proceedButtonTitle: string;
          proceedButtonFn: () => void;
      }
    | {
          enableProceedButton?: false;
          proceedButtonTitle: undefined;
          proceedButtonFn: undefined;
      };

type PopupProps = {
    onCloseHandler?: () => void;
} & CloseButtonOpions &
    ProceedButtonOptions;

const Popup: FC<PopupProps> = ({
    onCloseHandler,
    enableCloseButton,
    closeButtonFn,
    closeButtonTitle,
    enableProceedButton,
    proceedButtonTitle,
    proceedButtonFn,
}) => {
    const { isOpen, title, content } = useAppSelector(
        (state) => state.popupSlice,
    );

    const dispatch = useAppDispatch();

    const { closePopup } = popupSliceActions;

    const closePopupFn = () => {
        if (typeof onCloseHandler !== 'undefined') {
            onCloseHandler();
        }

        dispatch(closePopup());
    };

    const closeButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        if (typeof closeButtonFn !== 'undefined') {
            closeButtonFn();
        }

        closePopupFn();
    };

    const proceedButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        if (typeof proceedButtonFn !== 'undefined') proceedButtonFn();

        dispatch(closePopup());
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={closePopupFn}
            >
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                </DialogContent>
                <DialogActions className={classes.buttonContainer}>
                    {enableCloseButton && (
                        <SecondaryButton
                            onClickHanlder={closeButtonOnClickHandler}
                        >
                            {closeButtonTitle || 'Close'}
                        </SecondaryButton>
                    )}
                    {enableProceedButton && (
                        <PrimaryButton
                            onClickHanlder={proceedButtonOnClickHandler}
                        >
                            {proceedButtonTitle || 'Ok'}
                        </PrimaryButton>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Popup;
