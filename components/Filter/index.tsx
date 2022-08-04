import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import { useLocation } from '../../context/location';
import useCategories from '../../hooks/useCategories';
import useGames, { Game } from '../../hooks/useGames';
import useMechanics from '../../hooks/useMechanics';
import useThrottle from '../../hooks/useThrottle';
import AutoComplete from '../AutoComplete';
import Button from '../Button';
import Chip from '../Chip';
import Item from '../Item';
import Input from '../Input';
import Slider from '../Slider';
import GameItem from '../GameItem';

export interface Filters {
  name?: string;
  radius?: number;
  categories?: string[];
  mechanics?: string[];
}

interface Props {
  initialValues: Filters;
  close: () => void;
  setFilters: (values: Filters) => void;
}

interface FilterSectionProps {
  main: string;
  sub?: string;
  children: React.ReactNode;
}

function Filter({ initialValues, setFilters, close }: Props) {
  const { address } = useLocation();
  const [radius, setRadius] = useState(initialValues.radius || 150);
  const { data: games, search } = useGames();
  const { data: categories } = useCategories();
  const { data: mechanics } = useMechanics();
  const throttle = useThrottle();

  const renderCategories = function () {
    if (!categories) return null;
    return categories.map((cat) => (
      <Chip
        key={cat.name}
        label={cat.name}
        name="categories"
        value={cat.id}
        id={cat.id}
      />
    ));
  };
  const renderMechanics = function () {
    if (!mechanics) return null;
    return mechanics.map((mech) => (
      <Chip
        key={mech.name}
        label={mech.name}
        name="mechanics"
        value={mech.id}
        id={mech.id}
      />
    ));
  };
  return (
    <div className="filter">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const filters = { ...values, radius };
          setFilters(filters);
          close();
        }}
        enableReinitialize
      >
        {({ values, handleChange, setFieldValue }: FormikProps<Filters>) => {
          return (
            <Form id="filter" className="filter__form">
              <FilterSection main="Filter by game">
                <Field name="name">
                  {({ field, form, meta }: FieldProps) => {
                    return (
                      <AutoComplete<Game>
                        {...field}
                        icon="search"
                        placeholder="Search games"
                        items={games}
                        Input={Input}
                        onChange={(e) => {
                          handleChange(e);
                          throttle.wait(() => {
                            if (!e.target.value) return;
                            search({ name: e.target.value, limit: 5 });
                          }, 500);
                        }}
                        itemRenderer={(item) => <GameItem game={item} />}
                        onItemClick={(item) => {
                          setFieldValue('name', item.name);
                        }}
                      />
                    );
                  }}
                </Field>
              </FilterSection>{' '}
              <FilterSection
                main="Search radius"
                sub={`Within ${radius} miles from ${
                  address ?? 'your current location'
                }`}
              >
                <Slider
                  min={0}
                  max={300}
                  step={5}
                  onChange={(val) => {
                    if (typeof val === 'number') {
                      setRadius(val);
                    }
                  }}
                  value={radius}
                  style={{ width: '300px' }}
                />
              </FilterSection>
              <FilterSection
                main="Filter by game category"
                sub={
                  categories
                    ? `${categories.length} categories found`
                    : undefined
                }
              >
                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  className="filter__categories"
                >
                  {renderCategories()}
                </div>
              </FilterSection>
              <FilterSection
                main="Filter by game mechanic"
                sub={
                  mechanics ? `${mechanics.length} mechanics found` : undefined
                }
              >
                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  className="filter__categories"
                >
                  {renderMechanics()}
                </div>
              </FilterSection>
            </Form>
          );
        }}
      </Formik>
      <div className="filter__actions">
        <Button
          onClick={() => {
            setFilters({
              radius: 300,
              name: undefined,
              categories: [],
              mechanics: [],
            });
            close();
          }}
          size="small"
          text="Reset"
          color="secondary"
        />
        <Button form="filter" type="submit" size="small" text="Apply" />
      </div>
    </div>
  );
}

function FilterSection({ main, sub, children }: FilterSectionProps) {
  return (
    <div className="filter-section">
      <div className="filter-section__title">
        <span className="filter-section__title__main">{main}</span>
        {sub ? <span className="filter-section__title__sub">{sub}</span> : null}
      </div>
      {children}
    </div>
  );
}

export default Filter;
