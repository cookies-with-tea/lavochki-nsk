import React, {useState} from 'react';
import {
    StyledAside,
    StyledFilterTitle,
    StyledFormControlRadioLabel, StyledList,
    StyledResetButton, StyledShowAllButton
} from "@/app/components/pages/BenchesPage/styles";
import {Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@mui/material";
import {data} from "dom7";

const BenchesSidebar = () => {
    const [dateValue, setDateValue] = useState('today')
    const [allDistrictsShow, setAllDistrictsShow] = useState(false)
    const [chipData, setChipData] = React.useState<any>([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);


    const handleDateValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDateValue((event.target as HTMLInputElement).value)
    }

    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const handleAllDistricts = (): void => {
        setAllDistrictsShow(!allDistrictsShow)
    }

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    return (
        <StyledAside>
            <div className="mb-52">
                <FormControl>
                    <FormLabel id="add-date" className="flex-end mb-22">
                        <StyledFilterTitle className="mr-12">Дата добавления</StyledFilterTitle>
                        <StyledResetButton>Сбросить</StyledResetButton>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="add-date"
                        name="add-date-group"
                        value={dateValue}
                        onChange={handleDateValueChange}
                        className="pl-10"
                    >
                        <StyledFormControlRadioLabel value="today" control={<Radio />} label="сегодня" />
                        <StyledFormControlRadioLabel value="week" control={<Radio />} label="на этой неделе" />
                        <StyledFormControlRadioLabel value="month" control={<Radio />} label="в этом месяце" />
                        <StyledFormControlRadioLabel value="year" control={<Radio />} label="в этом году" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="mb-54">
                <FormControl>
                    <FormLabel id="district" className="flex-end mb-22">
                        <StyledFilterTitle className="mr-12">Район</StyledFilterTitle>
                        <StyledResetButton>Сбросить</StyledResetButton>
                    </FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                            }
                            label="Дзержинский"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={jason} onChange={handleChange} name="jason" />
                            }
                            label="Железнодорожный"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={gilad} onChange={handleChange} name="jason" />
                            }
                            label="Заельцовский"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={jason} onChange={handleChange} name="jason" />
                            }
                            label="Калининский"
                        />
                        { !allDistrictsShow && ( <StyledShowAllButton onClick={handleAllDistricts}>Показать все</StyledShowAllButton>) }

                        {
                            allDistrictsShow && (
                                <div className="d-flex fd-column fw-no-w">
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                                        }
                                        label="Дзержинский"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={jason} onChange={handleChange} name="jason" />
                                        }
                                        label="Железнодорожный"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={gilad} onChange={handleChange} name="jason" />
                                        }
                                        label="Заельцовский"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={jason} onChange={handleChange} name="jason" />
                                        }
                                        label="Калининский"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                                        }
                                        label="Дзержинский"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={jason} onChange={handleChange} name="jason" />
                                        }
                                        label="Железнодорожный"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={gilad} onChange={handleChange} name="jason" />
                                        }
                                        label="Заельцовский"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={jason} onChange={handleChange} name="jason" />
                                        }
                                        label="Калининский"
                                    />
                                    { allDistrictsShow && ( <StyledShowAllButton onClick={handleAllDistricts}>Скрыть</StyledShowAllButton>) }
                                </div>
                            )
                        }

                    </FormGroup>
                </FormControl>
            </div>
            <div>
                <div className="flex-end mb-22">
                    <StyledFilterTitle className="mr-12">Теги</StyledFilterTitle>
                    <StyledResetButton>Сбросить</StyledResetButton>
                </div>
                <StyledList>
                    { chipData.map((data: any) => (
                        <>
                            <li className="mr-12 mb-12">
                                <Chip
                                    label={data.label}
                                    clickable
                                />
                            </li>
                        </>
                    )) }
                </StyledList>
            </div>
        </StyledAside>
    );
};

export default BenchesSidebar;