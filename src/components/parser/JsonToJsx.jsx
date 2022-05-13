import {
    List,
    ListItem,
    Table,
    Stack,
    Typography,
    Box,
    TableCell,
    TableHead,
    TableBody,
    TableRow,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React from 'react'

const JsonToJsx = ({ block }) => {
    const theme = useTheme()
    const query = useMediaQuery(theme.breakpoints.down(700))
    let jsx = block.map((block) => {
        switch (block.type) {
            case "header":
                if (block.data.level === 1) {
                    return (
                        <Typography variant='h3' component='h1' gutterBottom fontWeight={"bold"}>
                            {block.data.text}
                        </Typography>
                    );
                } else if (block.data.level === 2) {
                    return (
                        <Typography variant='h4' component='h2' gutterBottom fontWeight={"bold"}>
                            {block.data.text}
                        </Typography>
                    );
                } else if (block.data.level === 3) {
                    return (
                        <Typography variant='h5' component='h3' gutterBottom fontWeight={"bold"}>
                            {block.data.text}
                        </Typography>
                    );
                } else if (block.data.level === 4) {
                    return (
                        <Typography variant='h6' component='h4' gutterBottom fontWeight={"bold"}>
                            {block.data.text}
                        </Typography>
                    );
                } else if (block.data.level === 5) {
                    return (
                        <Typography variant='h6' component='h5' gutterBottom fontWeight={"bold"}>
                            {block.data.text}
                        </Typography>
                    );
                } else if (block.data.level === 6) {
                    return (
                        <Typography variant='h6' gutterBottom fontWeight={"bold"}>
                            {block.data.text}
                        </Typography>
                    );
                } else {
                    return (
                        <Typography variant='caption' gutterBottom fontWeight={"bold"}>
                            {block.data.text}
                        </Typography>
                    );
                }

            case "image":
                return (
                    <Box sx={{ py: 2 }}>
                        <img
                            src={block.data.file.url}
                            style={{ width: "100%", borderRadius: 5 }}
                            alt={block.data.file.url}
                        />
                        <Typography
                            variant='body1'
                            color='GrayText'
                            dangerouslySetInnerHTML={{ __html: `| ${block.data.caption}` }}
                            sx={{ pt: 1 }}
                        />
                    </Box>
                );

            case "table":
                return (
                    <Table>
                        <TableHead>
                            {block.data.header.map((header) => (
                                <TableCell>{header}</TableCell>
                            ))}
                        </TableHead>
                        <TableBody>
                            {block.data.rows.map((row) => (
                                <TableRow>
                                    {row.map((cell) => (
                                        <TableCell>{cell}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                );

            case "paragraph":
                return (
                    <Box
                        component={Typography}
                        paragraph
                        sx={{
                            fontSize: "16px",
                            fontWeight: "300",
                            letterSpacing: "0.5px",
                        }}
                        dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                    />
                );

            case "delimiter":
                return (
                    <Box
                        py={2}
                        sx={{
                            lineHeight: "1.6rem",
                            width: "100%",
                            textAlign: "center",
                            "&::before": {
                                content: '"*****"',
                                display: "inline-block",
                                width: "100%",
                                height: "1.6rem",
                                lineHeight: "1.6rem",
                                fontSize: "2.6rem",
                                fontWeight: "bold",
                                letterSpacing: "0.2rem",
                            },
                        }}
                    />
                );
            case "qoute":
                return (
                    <Box p={2} my={2} sx={{ backgroundColor: "#E5FFEA" }}>
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Typography fontSize={"4rem"}>“</Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.3rem",
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                }}
                                color='text.secondary'
                                dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                            />
                            <Typography fontSize={"4rem"}>“</Typography>
                        </Stack>
                        <Typography
                            variant='body1'
                            color='GrayText'
                            textAlign='right'
                            dangerouslySetInnerHTML={{ __html: `${block.data.caption}` }}
                            sx={{ pt: 1 }}
                        />
                    </Box>
                );

            case "embed":
                return (
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            overflow: "hidden",
                            pt: "56.2%",
                        }}
                    >
                        <iframe
                            title='youtube'
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                bottom: "0",
                                right: "0",
                                width: "100%",
                                height: "100%",
                                border: "none",
                            }}
                            frameBorder='0'
                            src={block.data.embed}
                            allow='autoplay; encrypted-media'
                        />
                    </Box>
                );

            case "list":
                let count = 1;
                return (
                    <Box>
                        <List>
                            {block.data.style === "unordered"
                                ? block.data.items.map((item) => {
                                    return (
                                        <>
                                            <ListItem>
                                                <Stack direction='row' spacing={1} alignItems='center'>
                                                    <Box
                                                        sx={{
                                                            height: "10px",
                                                            width: "10px",
                                                            backgroundColor: "#000000",
                                                            borderRadius: "50%",
                                                            display: "inline-block",
                                                        }}
                                                    />
                                                    <Typography
                                                        variant='body1'
                                                        color='black'
                                                        gutterBottom
                                                        dangerouslySetInnerHTML={{ __html: `${item}` }}
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "400",
                                                            letterSpacing: "0.5px",
                                                        }}
                                                    />
                                                </Stack>
                                            </ListItem>
                                        </>
                                    );
                                })
                                : block.data.items.map((item) => {
                                    return (
                                        <ListItem>
                                            <Stack direction='row' spacing={2}>
                                                <Typography variant='body1' fontWeight='bold'>
                                                    {count++}
                                                </Typography>
                                                <Typography
                                                    variant='body1'
                                                    color='black'
                                                    gutterBottom
                                                    dangerouslySetInnerHTML={{ __html: `${item}` }}
                                                    sx={{
                                                        fontSize: "18px",
                                                        fontWeight: "400",
                                                        letterSpacing: "0.5px",
                                                    }}
                                                />
                                            </Stack>
                                        </ListItem>
                                    );
                                })}
                        </List>
                    </Box>
                );

            default:
                console.log("Unknown block type", block.type);
        }
        return null;
    });
    return (
        <Box sx={{ px: query ? 2 : 20 }}>
            {jsx}
        </Box>
    )
}

export default JsonToJsx