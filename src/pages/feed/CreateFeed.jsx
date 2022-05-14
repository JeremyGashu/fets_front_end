import { Box, Button, Typography, Dialog, Grid } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useState } from "react"
import { useRef } from "react"
import { useDropzone } from "react-dropzone"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ReactEditorJS } from "../.."
import { EDITOR_JS_TOOLS } from "../../configs/EditorJsConfig"
import { createFeed } from "../../controller/feed"
import { mainColor } from "../../themes/color"

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { QuestionMark, SaveOutlined } from "@mui/icons-material"

const CreateFeed = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        if (!title) {
            toast('Title cannot be empty.', { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, })
            return
        }

        if (!coverImage) {
            toast('Cover image cannot be empty.', { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, })
            return
        }

        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const editorCore = useRef(null)

    const [coverImage, setCoverImage] = useState()
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation(createFeed, {
        onError: (error, variables, context) => {
            error.response.data && error.response.data.errors && error.response.data.errors.forEach(error => {
                toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, })
            })

            handleClose()
        },
        onSuccess: (data, variables, context) => {
            toast('Saved feed successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/technical-admin')
            handleClose()
        },
    })

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            console.log(acceptedFiles)
            if (acceptedFiles) {
                console.log(URL.createObjectURL(acceptedFiles[0]))
                setCoverImage(acceptedFiles[0])
            }
        }
    })

    const handleInitialize = (instance) => {
        editorCore.current = instance
    }

    const handleSave = async () => {
        const savedData = await editorCore.current.save();
        console.log(savedData)
        console.log(title)
        console.log(coverImage)

        mutate({
            metadata: JSON.stringify(savedData),
            title: title,
            coverImage
        })
    }


    return (
        <>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <QuestionMark sx={{ color: mainColor, fontSize: 22 }} />
                        </Grid>
                        <Grid item>
                            <Typography sx={{ color: mainColor }}>Save Blog</Typography>
                        </Grid>

                    </Grid>
                </DialogTitle>
                <DialogContent dividers>

                    <Typography gutterBottom>
                        Are you sure you want to save blog titled {title}?
                    </Typography>
                </DialogContent>
                <DialogActions>

                    <Button sx={{
                        width: 150,
                    }} autoFocus onClick={handleClose}>
                        Cancel
                    </Button>


                    <Button sx={{
                        width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                            backgroundColor: mainColor
                        }
                    }} autoFocus onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ zIndex: 100000, position: 'fixed', left: 0, right: 0, top: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pt: 2, pb: 3,pr:2, backgroundColor: 'white', boxShadow: `3px 3px 3px ${grey[100]}` }}>
                <Button startIcon={<SaveOutlined sx={{color : 'white'}}/>} disabled={isLoading} size='large' sx={{
                    width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                        backgroundColor: mainColor
                    }
                }} onClick={handleClickOpen} >Save Blog</Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 12, }}>
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} maxLength='200' style={{ border: `1px solid ${grey[300]}`, padding: '20px 15px', borderRadius: '5px', fontSize: 30, fontWeight: 500, outline: 'none', width: '70%', margin: '5' }} placeholder='Title goes here...' />

            </Box>

            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {
                    !coverImage ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ px: 1, py: 1, m: 2, border: `1px dashed ${grey[400]}`, borderRadius: 1, width: '70%', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 35, color: grey[300] }} >Drag cover image here...</Typography>
                            <Typography sx={{ fontSize: 22, color: grey[300] }} >Click to Select...</Typography>
                        </Box>

                    </Box>
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2, p: 2, backgroundColor: grey[100], borderRadius: 5 }}>
                            <img style={{ width: '100%', maxWidth: '850px' }} src={URL.createObjectURL(coverImage)} alt=''/>
                        </Box>
                }
            </div>
            <ReactEditorJS onInitialize={handleInitialize} tools={EDITOR_JS_TOOLS} />


        </>
    )
}

export default CreateFeed