import React from "react";

import { useParams, Navigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

import useInputStore from "../stores/inputStore";
import useSequence from "../hooks/useSequence";
import Spinner from "./Spinner";
import LoadingOverview from "../pages/LoadingOverview";

const DISPALAY_STATE = {
    NOTHING: 0,
    REDIRECT: 1,
    SEQUENCE: 2,
    PAGE: 3,
};

function LoadingModal() {
    return (
        <>
            <LoadingOverview />
            <Modal show={true} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title>Loading Sequence</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Spinner size="2em" /> Loading your sequence ... just one
                    moment.
                </Modal.Body>
            </Modal>
        </>
    );
}

const SequenceLoader = ({ children }) => {
    const { isLoading, isSuccess, isError, refetch } = useSequence();

    React.useEffect(() => {
        refetch();
    }, []);

    if (isLoading) return <LoadingModal />;
    if (isError) return <Navigate to="/" />;
    if (isSuccess) return <>{children}</>;
};

export default function InputGate({ children }) {
    const [setInput, validateInput, reset_input] = useInputStore((state) => [
        state.setInput,
        state.validate,
        state.reset,
    ]);
    const [renderState, setRenderState] = React.useState(
        DISPALAY_STATE.NOTHING
    );

    const urlInput = useParams();
    const isParamEmpty = Object.keys(urlInput).length === 0;
    const { isSuccess } = useSequence();

    React.useEffect(() => {
        if (!isParamEmpty) {
            reset_input();
            setInput(urlInput.sequence);
            let isValid = validateInput();
            if (isValid) {
                setRenderState(DISPALAY_STATE.SEQUENCE);
            } else {
                setRenderState(DISPALAY_STATE.REDIRECT);
            }
        } else {
            if (!isSuccess) setRenderState(DISPALAY_STATE.REDIRECT);
            else setRenderState(DISPALAY_STATE.PAGE);
        }
    }, []);

    switch (renderState) {
        case DISPALAY_STATE.REDIRECT:
            return <Navigate to="/" />;
        case DISPALAY_STATE.SEQUENCE:
            return <SequenceLoader>{children}</SequenceLoader>;
        case DISPALAY_STATE.PAGE:
            return <>{children}</>;
        default:
            return <></>;
    }
}
