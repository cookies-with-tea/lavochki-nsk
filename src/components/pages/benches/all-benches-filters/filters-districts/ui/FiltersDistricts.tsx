import { ChangeEvent, useState } from 'react'
import { Button, Checkbox } from '@/components/shared'
import { filtersDistricts } from '@/components/pages/benches/all-benches-filters/filters-districts/config'
import styles from '@/components/pages/benches/all-benches-filters/ui/style.module.scss'

export const FiltersDistricts = () => {
  const [districts, setDistricts] = useState(filtersDistricts.ALL_DISTRICTS)
  const [sliceDistrictValue, setSliceDistrictValue] = useState(filtersDistricts.DEFAULT_VISIBLE_DISTRICTS)
  const [allDistrictsShow, setAllDistrictsShow] = useState(filtersDistricts.ALL_DISTRICTS_SHOW)
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])

  const handleCheckboxValueChange = (value: Array<string>) => {
    setCheckedValues(value)
  }

  const handleDistrictsVisibleToggle = () => {
    allDistrictsShow
      ? setSliceDistrictValue(filtersDistricts.DEFAULT_VISIBLE_DISTRICTS)
      : setSliceDistrictValue(districts.length)

    setAllDistrictsShow(!allDistrictsShow)
  }

  // TODO: Посмотреть на поведение Checkbox'а. В случае чего изменить логику компонентов Checkbox, CheckboxGroup.
  const handleDistrictChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDistricts(districts.map((district) => {
      if (district.label === event.target.name) {
        return { ...district, checked: event.target.checked }
      }

      return district
    }))
  }

  return (
    <div>
      <div className={styles['all-benches-filters__header']}>
        <h4>Район</h4>

        <Button appearance={'dashed'} className={'ml-12'}>Сбросить</Button>
      </div>

      <Checkbox.Group onChange={handleCheckboxValueChange}>
        {
          districts.map((district) => (
            <Checkbox key={district.id} label={district.label} value={district.value} name={district.value} />
          )).splice(0, sliceDistrictValue)
        }
      </Checkbox.Group>

      { !allDistrictsShow
        ? (
          <Button appearance={'link-underline'} onClick={handleDistrictsVisibleToggle}>
            Показать все
          </Button>
        )
        : (
          <Button onClick={handleDistrictsVisibleToggle}>
            Скрыть
          </Button>
        )
      }
    </div>
  )
}
