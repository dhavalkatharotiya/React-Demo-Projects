import { InputAdornment, Paper, Slider, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { PercentRounded } from '@mui/icons-material';

const Calc = () => {
    const [monthlyInvest, setMonthlyInvest] = useState(10000);
    const [anualStepUp, setAnualStepUp] = useState(10);
    const [returnPer, setReturnPer] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0)

    const countInvevstedAmount = async () => {
        let totalInvestment = 0;
        let monthlyInvestedAmount = monthlyInvest;
        for (let i = 1; i <= timePeriod; i++) {
            if (i !== 1) {
                monthlyInvestedAmount = monthlyInvestedAmount + ((monthlyInvestedAmount * anualStepUp) / 100);
            }
            for (let j = 1; j <= 12; j++) {
                totalInvestment = totalInvestment + monthlyInvestedAmount;
            }
        }
        totalInvestment = Math.round(totalInvestment);

        setInvestedAmount(totalInvestment);
    }

    const countTotalValue = () => {
        let monthlyInvestedAmount = monthlyInvest;
        let totalAmount = 0;
        for (let i = 1; i <= timePeriod; i++) {
            if (i !== 1) {
                monthlyInvestedAmount = monthlyInvestedAmount + (((monthlyInvestedAmount * anualStepUp) / 100));
            }
            for (let j = 1; j <= 12; j++) {
                totalAmount += monthlyInvestedAmount;
                let interest = totalAmount * (returnPer / (100 * 12));
                totalAmount += interest;
            }
        }
        totalAmount = Math.round(totalAmount);

        setTotalAmount(totalAmount);
    }

    useEffect(() => {
        countInvevstedAmount();
        countTotalValue();
    }, [monthlyInvest, anualStepUp, timePeriod, returnPer])


    return (
        <div className='container'>
            <div className='text-center mt-5'>
                <p style={{ fontWeight: 600, fontSize: '35px' }}>Step Up SIP Calculator</p>
            </div>
            <div className='displayAmount mt-5'>
                <div className='d-flex flex-column text-center'>
                    <p>Invested Amount</p>
                    <div>
                        <TextField
                            disabled
                            id="filled-disabled"
                            value={investedAmount}
                            size='small'
                            inputProps={{min: 0, style : {textAlign: 'right'}}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" sx={{ color: '#00b386' }}><CurrencyRupeeRoundedIcon sx={{ height: '20px' }} /></InputAdornment>
                            }}
                            sx={{background: '#ebf9f5', input: {color: '#00b386', fontWeight : 600, width: '15ch'}}}
                        />
                    </div>
                </div>
                <div className='d-flex flex-column text-center'>
                    <p>Est. returns</p>
                    <div>
                    <TextField
                            disabled
                            id="filled-disabled"
                            value={totalAmount - investedAmount}
                            size='small'
                            inputProps={{min: 0, style : {textAlign: 'right'}}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" sx={{ color: '#00b386' }}><CurrencyRupeeRoundedIcon sx={{ height: '20px' }} /></InputAdornment>
                            }}
                            sx={{background: '#ebf9f5', input: {color: '#00b386', fontWeight : 600, width: '15ch'}}}
                        />
                    </div>
                </div>
                <div className='d-flex flex-column text-center'>
                    <p>Total Amount</p>
                    <div>
                    <TextField
                            disabled
                            id="filled-disabled"
                            value={totalAmount}
                            size='small'
                            inputProps={{min: 0, style : {textAlign: 'right'}}}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" sx={{ color: '#00b386' }}><CurrencyRupeeRoundedIcon sx={{ height: '20px' }} /></InputAdornment>
                            }}
                            sx={{background: '#ebf9f5', input: {color: '#00b386', fontWeight : 600, width: '15ch'}}}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Paper elevation={2} sx={{ maxWidth: '75%' }} className='mx-auto'>
                    <div className="d-flex flex-column p-5">
                        <div>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p>Monthly investment</p>
                                <div>
                                    <TextField
                                        sx={{ background: monthlyInvest < 500 || monthlyInvest > 100000 ? '#fae9e5' : '#ebf9f5', input: { color: monthlyInvest < 500 || monthlyInvest > 100000 ? '#eb5b3c' : '#00b386', fontWeight: 600, width: '15ch' } }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start" sx={{ color: monthlyInvest < 500 || monthlyInvest > 100000 ? '#eb5b3c' : '#00b386' }}><CurrencyRupeeRoundedIcon sx={{ height: '20px' }} /></InputAdornment>
                                        }}
                                        value={monthlyInvest}
                                        onChange={(event) => setMonthlyInvest(event.target.value)}
                                        size='small'
                                        color={monthlyInvest < 500 || monthlyInvest > 100000 ? 'error' : 'success'}
                                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                    />
                                </div>
                            </div>
                            <Slider min={500} max={100000} step={500} value={monthlyInvest} onChange={(event, value) => setMonthlyInvest(value)} sx={{ color: '#00b386' }} aria-label="Default" valueLabelDisplay="auto" />
                        </div>
                        <div className='mt-4'>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p>Annual step up</p>
                                <div>
                                    <TextField
                                        sx={{ background: anualStepUp < 1 || anualStepUp > 50 ? '#fae9e5' : '#ebf9f5', input: { color: anualStepUp < 1 || anualStepUp > 50 ? '#eb5b3c' : '#00b386', fontWeight: 600, width: '15ch' } }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end" sx={{ color: anualStepUp < 1 || anualStepUp > 50 ? '#eb5b3c' : '#00b386' }}><PercentRounded sx={{ height: '20px' }} /></InputAdornment>
                                        }}
                                        value={anualStepUp}
                                        onChange={(event) => setAnualStepUp(event.target.value)}
                                        size='small'
                                        color={anualStepUp < 1 || anualStepUp > 50 ? 'error' : 'success'}
                                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                    />
                                </div>
                            </div>
                            <Slider min={1} max={50} step={1} value={anualStepUp} onChange={(event, value) => setAnualStepUp(value)} sx={{ color: '#00b386' }} aria-label="Default" valueLabelDisplay="auto" />
                        </div>
                        <div className='mt-4'>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p>Expected return rate (p.a)</p>
                                <div>
                                    <TextField
                                        sx={{ background: returnPer < 1 || returnPer > 30 ? '#fae9e5' : '#ebf9f5', input: { color: returnPer < 1 || returnPer > 30 ? '#eb5b3c' : '#00b386', fontWeight: 600, width: '15ch' } }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end" sx={{ color: returnPer < 1 || returnPer > 30 ? '#eb5b3c' : '#00b386' }}><PercentRounded sx={{ height: '20px' }} /></InputAdornment>
                                        }}
                                        value={returnPer}
                                        onChange={(event) => setReturnPer(event.target.value)}
                                        size='small'
                                        color={returnPer < 1 || returnPer > 30 ? 'error' : 'success'}
                                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                    />
                                </div>
                            </div>
                            <Slider min={1} max={30} step={1} value={returnPer} onChange={(event, value) => setReturnPer(value)} sx={{ color: '#00b386' }} aria-label="Default" valueLabelDisplay="auto" />
                        </div>
                        <div className='mt-4'>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p>Time period</p>
                                <div>
                                    <TextField
                                        sx={{ background: timePeriod < 1 || timePeriod > 40 ? '#fae9e5' : '#ebf9f5', input: { color: timePeriod < 1 || timePeriod > 40 ? '#eb5b3c' : '#00b386', fontWeight: 600, width: '15ch' } }}
                                        InputProps={{
                                            endAdornment: <InputAdornment className='yearColor' position="end" sx={{ color: timePeriod < 1 || timePeriod > 40 ? '#eb5b3c' : '#00b386' }}>Yr</InputAdornment>
                                        }}
                                        value={timePeriod}
                                        onChange={(event) => setTimePeriod(event.target.value)}
                                        size='small'
                                        color={timePeriod < 1 || timePeriod > 40 ? 'error' : 'success'}
                                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                    />
                                </div>
                            </div>
                            <Slider min={1} max={40} step={1} value={timePeriod} onChange={(event, value) => setTimePeriod(value)} sx={{ color: '#00b386' }} aria-label="Default" valueLabelDisplay="auto" />
                        </div>
                        {/* <div style={{ width: '50%' }} className='mt-5'>
                            <div className='d-flex flex-row justify-content-between'>
                                <p>Invested Amount</p>
                                <p><b>{investedAmount}</b></p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p>Est. returns</p>
                                <p>{totalAmount - investedAmount}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p>Total Amount</p>
                                <p>{totalAmount}</p>
                            </div>
                        </div> */}
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default Calc