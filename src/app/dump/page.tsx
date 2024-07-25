"use client";

import { getMessages } from "@/libs/db";
import { Message } from "@/models/message";
import { Box, Container, Link as RadixUiLink, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
    min-height: 100vh;
`;

export default function Dump() {
    const [messages, setMessages] = React.useState<Message[]>([]);

    React.useEffect(() => {
        getMessages((messages) => {
            setMessages(messages);
        });
    }, []);

    return (
        <StyledMain>
            <Container size="1">
                <Box mt="6" />
                <RadixUiLink asChild>
                    <Link href="/">入力に戻る</Link>
                </RadixUiLink>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>id</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>date</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>message</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {messages.map((e, i) => {
                            return (
                                <Table.Row key={i}>
                                    <Table.RowHeaderCell>{e.id}</Table.RowHeaderCell>
                                    <Table.Cell>{e.createdAt.toLocaleString()}</Table.Cell>
                                    <Table.Cell>{e.text}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            </Container>
        </StyledMain>
    );
}
