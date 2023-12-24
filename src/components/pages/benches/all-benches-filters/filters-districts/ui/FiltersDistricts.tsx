import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Checkbox } from '@/components/shared'
import { filtersDistricts } from '@/components/pages/benches/all-benches-filters/filters-districts/config'
import styles from '@/components/pages/benches/all-benches-filters/ui/style.module.scss'

export const FiltersDistricts = () => {
  const [districts, setDistricts] = useState(filtersDistricts.ALL_DISTRICTS)
  const [checkedDistricts, setCheckedDistricts] = useState<Array<string>>([])
  const [sliceDistrictValue, setSliceDistrictValue] = useState(filtersDistricts.DEFAULT_VISIBLE_DISTRICTS)
  const [allDistrictsShow, setAllDistrictsShow] = useState(filtersDistricts.ALL_DISTRICTS_SHOW)

  const [isExpandButtonVisible, setIsExpandButtonVisible] = useState(false)

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

  // TODO: Добавить сброс районов
  const handleDistrictsReset = () => {
    setCheckedDistricts([])
  }

  useEffect(() => {
    setIsExpandButtonVisible(districts.length >= sliceDistrictValue)
  }, [districts.length])

  return (
    <div>
      <div className={styles['all-benches-filters__header']}>
        <h4>Район</h4>

        <Button
          appearance={'dashed'}
          className={'ml-12'}
          onClick={handleDistrictsReset}
        >
          Сбросить
        </Button>
      </div>

      <Checkbox.Group value={checkedDistricts} className={'mt-24'} onChange={setCheckedDistricts}>
        {
          districts.map((district) => (
            <Checkbox key={district.id} label={district.label} value={district.value} name={district.value} />
          )).splice(0, sliceDistrictValue)
        }
      </Checkbox.Group>

      {
        isExpandButtonVisible && (
          <Button
            appearance={'link-underline'}
            className={styles['all-benches-filters__expand-button']}
            onClick={handleDistrictsVisibleToggle}
          >
            { !allDistrictsShow ? 'Показать все' : 'Скрыть' }
          </Button>
        )
      }
    </div>
  )
}
