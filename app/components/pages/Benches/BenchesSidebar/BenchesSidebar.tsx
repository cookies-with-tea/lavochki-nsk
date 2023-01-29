import { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react'
import {
  FormControl,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import {
  StyledAside,
  StyledCheckbox,
  StyledCheckedIconWrapper,
  StyledChip,
  StyledFilterTitle,
  StyledFormControlLabel,
  StyledFormControlRadioLabel,
  StyledIcon,
  StyledList,
  StyledResetButton,
  StyledShowAllButton
} from '@/app/components/pages/Benches/BenchesSidebar/BenchesSidebar.styles'
import CommonIcon from '@/app/components/Common/CommonIcon/CommonIcon'
import { BenchTagType } from '@/app/types/bench.type'

interface IProps {
  tags: BenchTagType[]
}

const BenchesSidebar: FC<IProps> = ({ tags }): ReactElement => {
  const [dateValue, setDateValue] = useState('today')
  const [allDistrictsShow, setAllDistrictsShow] = useState(false)
  const [allTagsShow, setAllTagsShowShow] = useState(false)
  const [tagsButtonShow, setTagsButtonShow] = useState(false)
  const [sliceDistrictValue, setSliceDistrictValue] = useState(4)
  const [sliceTagValue, setSliceTagValue] = useState(5)

  const [district, setDistrict] = useState([
    { id: 0, label: 'Дзержинский', value: 'dz', checked: false, },
    { id: 1, label: 'Железнодорожный', value: 'jd', checked: false, },
    { id: 2, label: 'Заельцовский', value: 'za', checked: false, },
    { id: 3, label: 'Калининский', value: 'ka', checked: false, },
    { id: 4, label: 'q', value: 'ka', checked: false, },
    { id: 5, label: 'w', value: 'ka', checked: false, },
    { id: 6, label: 'e', value: 'ka', checked: false, },
  ])

  const [chipData, setChipData] = useState<BenchTagType[]>([])

  const setChips = (): void => {
    const newChips = tags.map((tag) => (
      { id: tag.id, title: tag.title, active: false }
    ))

    setChipData(newChips)
  }

  const handleDateValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setDateValue((event.target as HTMLInputElement).value)
  }

  const handleDistrictChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newDistrictData = district.map((item) => {
      if (item.label === event.target.name) {
        return { ...item, checked: event.target.checked }
      }

      return item
    })

    setDistrict(newDistrictData)
  }

  const handleDistrictsVisibleToggle = (): void => {
    allDistrictsShow 
      ? setSliceDistrictValue(4)
      : setSliceDistrictValue(district.length)

    setAllDistrictsShow(!allDistrictsShow)
  }

  const handleTagsVisibleToggle = (): void => {
    allTagsShow ? setSliceTagValue(5) : setSliceTagValue(chipData.length)

    setAllTagsShowShow(!allTagsShow)
  }

  const handleActiveTagSet = (tagId: string): void => {
    const newChipData = chipData.map((chip) => {
      if (chip.id === tagId) {
        return { ...chip, active: !chip.active }
      }

      return chip
    })

    setChipData(newChipData)
  }

  const handleDateFilterReset = (): void => {
    setDateValue('today')
  }

  const handleDistrictFilterReset = (): void => {
    const newDistrictData = district.map((item) => ( 
      { ...item, checked: false }
    ))

    setDistrict(newDistrictData.splice(0))
  }

  const handleTagsFilterReset = (): void => {
    const newChipData = chipData.map((chip) => ( 
      { ...chip, active: false } )
    )

    setChipData(newChipData.splice(0))
  }

  useEffect(() => {
    setChips()

    setTagsButtonShow(chipData.length >= sliceDistrictValue)
  }, [tags])

  return (
    <StyledAside>
      <div className="mb-52">
        <FormControl>
          <FormLabel id="add-date" className="d-f flex-end mb-22">
            <StyledFilterTitle className="mr-12">
              Дата добавления
            </StyledFilterTitle>
            <StyledResetButton
              onClick={handleDateFilterReset}
            >
              Сбросить
            </StyledResetButton>
          </FormLabel>
          <RadioGroup
            aria-labelledby="add-date"
            name="add-date-group"
            value={dateValue}
            onChange={handleDateValueChange}
            className="pl-10"
          >
            
            <StyledFormControlRadioLabel
              value="today"
              control={<Radio />}
              label="сегодня"
            />
            <StyledFormControlRadioLabel
              value="week" 
              control={<Radio />}
              label="на этой неделе"
            />
            <StyledFormControlRadioLabel
              value="month"
              control={<Radio />}
              label="в этом месяце"
            />
            <StyledFormControlRadioLabel
              value="year"
              control={<Radio />}
              label="в этом году" 
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="mb-52">
        <FormControl sx={{ width: '300px' }}>
          <FormLabel id="district" className="d-f flex-end mb-22">
            <StyledFilterTitle className="mr-12">Район</StyledFilterTitle>
            <StyledResetButton
              onClick={handleDistrictFilterReset}
            >
              Сбросить
            </StyledResetButton>
          </FormLabel>
          <FormGroup>
            { district && district.map((item) =>
              (
                <StyledFormControlLabel
                  key={item.id}
                  control={
                    <StyledCheckbox
                      icon={<StyledIcon />}
                      checkedIcon={
                        <StyledCheckedIconWrapper>
                          <CommonIcon name="check" width={17} height={12} />
                        </StyledCheckedIconWrapper>
                      }
                      checked={item.checked}
                      onChange={handleDistrictChange}
                      name={item.label}
                    />
                  }
                  label={item.label}
                />
              )).splice(0, sliceDistrictValue) }
            { !allDistrictsShow
              ? <StyledShowAllButton onClick={handleDistrictsVisibleToggle}>
                Показать все
              </StyledShowAllButton>
              : <StyledShowAllButton onClick={handleDistrictsVisibleToggle}>
                Скрыть
              </StyledShowAllButton>
            }
          </FormGroup>
        </FormControl>
      </div>
      <div>
        <div className="d-f flex-end mb-22">
          <StyledFilterTitle className="mr-12">Теги</StyledFilterTitle>
          <StyledResetButton onClick={handleTagsFilterReset}>
            Сбросить
          </StyledResetButton>
        </div>
        <StyledList>
          { chipData.map((data, index: number) => (
            <li className="mr-12 mb-12" key={index}>
              <StyledChip
                label={data.title}
                variant={data.active ? 'filled' : 'outlined'}
                onClick={handleActiveTagSet.bind(null, data.id)}
                clickable
              />
            </li>
          )).splice(0, sliceTagValue) }
        </StyledList>
        {
          tagsButtonShow && (
            <>
              { !allTagsShow
                ? ( <StyledShowAllButton onClick={handleTagsVisibleToggle}>
                  Показать все
                </StyledShowAllButton>)
                : ( <StyledShowAllButton onClick={handleTagsVisibleToggle}>
                  Скрыть
                </StyledShowAllButton> )
              }
            </>
          )
        }
      </div>
    </StyledAside>
  )
}

export default BenchesSidebar
