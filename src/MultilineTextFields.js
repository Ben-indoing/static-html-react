import React, {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { xmindTranslate } from './util'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },

    button: {
        margin: theme.spacing(3),
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: theme.spacing(3),
        // width: '100%',
        // height: '100hv',

    },
    textField: {
        width: '50%',
    },
    plate: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'space-around',
        width:'30%',
    }
}));

export default function MultilineTextFields() {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [result, setResult] = useState('')
    const [copyState, setCopyState] = useState('copy')
    const textAreaRef = useRef(null)

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const copyToClipboard = () => {
        textAreaRef.current.select()
        document.execCommand('copy')
        setCopyState('Copied!')
    }

    return (
        <div className={classes.root}>
            <div>
                把需要整理的数据放copy在左边，点击submit，右边会出现整理好的数据，点击copy，粘贴到自己想要的位置
            </div>
            <div className={classes.container}>
                <div className={classes.plate}>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<PublishIcon/>}
                        onClick={() => {
                            setCopyState(() => 'copy')
                            setResult(() => xmindTranslate(value))
                        }}
                    >
                        submit
                    </Button>
                    <TextField
                        id="outlined-multiline-static"
                        label="input"
                        multiline
                        value={value}
                        onChange={handleChange}
                        rows={20}
                        variant="outlined"
                        fullWidth={true}
                    />
                </div>
                <div className={classes.plate}>
                    <Button
                        variant="contained"
                        color={copyState === 'copy' ? 'default' : 'secondary'}
                        className={classes.button}
                        startIcon={<FileCopyOutlinedIcon/>}
                        onClick={copyToClipboard}
                    >
                        {copyState}
                    </Button>
                    <TextField
                        id="outlined-multiline-static"
                        label="output"
                        multiline
                        value={result}
                        rows={20}
                        variant="outlined"
                        fullWidth={true}
                        inputRef={textAreaRef}
                    />
                </div>
            </div>
        </div>

    );
}

