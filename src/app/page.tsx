"use client";

import React from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { addMessage } from "@/libs/db";

export default function Home() {
    const [text, setText] = React.useState("");
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (text.length <= 0) {
            setText("");
            enqueueSnackbar("メッセージを入力してください", { variant: "warning" });
            return;
        }

        function dbOnErr(e: Event) {
            enqueueSnackbar(`保存に失敗しました...(${{ e }})`, { variant: "error" });
        }
        function dbOnSuccess() {
            enqueueSnackbar("保存しました！", { variant: "success" });
        }

        addMessage(text, dbOnSuccess, dbOnErr);

        setText("");
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SnackbarProvider />
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-4">
                    <span>
                        <ResizingTextarea text={text} setText={setText} />
                    </span>
                    <span>
                        <SendButton />
                    </span>
                </div>
            </form>
        </main>
    );
}

const StyledTextarea = styled.textarea`
    minwidth: 15rem;
    width: 60vw;

    resize: none;
    font-size: 1rem;
    min-height: calc(2rem + 16px);

    background-color: #ffffff;
    border: #0000;
    outline-color: #0000;
    &:focus-visible: {
        outline: none;
    }

    font-family: var(--font-noto-sans-jp);

    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 8px;
    padding-bottom: 8px;

    border-radius: 8px;
`;

function ResizingTextarea({ text, setText, name }: { text: string; setText: (text: string) => void; name?: string }) {
    function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight + 8}px`;

        setText(e.target.value);
    }
    return (
        <>
            <StyledTextarea value={text} onChange={(e) => handleInput(e)} name={name} />
        </>
    );
}

const StyledIconButton = styled.button`
    background: #0090ff;
    border: none;
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:active {
        background: #0077cc;
    }
`;
function SendButton() {
    return (
        <StyledIconButton>
            <Icon icon="ic:round-mail" style={{ fontSize: "2rem", color: "#fff" }} />
        </StyledIconButton>
    );
}
