import React, { FC, useState } from 'react';
import { Form, Input, Select, Button, AutoComplete, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import locationData from './location.json';
import { SkillsOptions, experienceOptions } from '../constant';
import style from '../jobs.module.scss';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface JobFilterProps {
  onFilter: (filters: any) => void;
}

const JobFilter: FC<JobFilterProps> = ({ onFilter }) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string | undefined>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');

  const [provinceSuggestions, setProvinceSuggestions] = useState<string[]>(locationData.map((prov) => prov.Name));

  const handleProvinceChange = (input: string | undefined) => {
    if (input) {
      setSelectedProvince(input);
      const suggestions = locationData.filter((province) => province.Name.toLowerCase().includes(input.toLowerCase())).map((prov) => prov.Name);
      setProvinceSuggestions(suggestions);
    } else {
      setSelectedProvince('');
      setProvinceSuggestions(locationData.map((prov) => prov.Name));
    }
  };

  const handleFilter = () => {
    const filters = {
      position,
      experience: selectedExperience,
      skills: selectedSkills,
      province: selectedProvince,
    };
    onFilter(filters);
  };

  return (
    <Form layout='vertical' onFinish={handleFilter} className={style.jobfilter}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item>
            <Input
              placeholder={t('field.positionPlaceholder')}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={style.input}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item>
            <Select
              placeholder={t('field.experiencePlaceholder')}
              value={selectedExperience && selectedExperience.length > 0 ? selectedExperience : undefined}
              onChange={(value) => setSelectedExperience(value)}
              allowClear
              className={style.select}
            >
              {experienceOptions.map((exp) => (
                <Option key={exp} value={exp}>
                  {exp}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item className={style.skillsFilter}>
            <Select
              mode='multiple'
              placeholder={t('field.skillsPlaceholder')}
              value={selectedSkills}
              onChange={(value) => setSelectedSkills(value)}
              allowClear
              className={style.select}
            >
              {SkillsOptions.map((skill) => (
                <Option key={skill} value={skill}>
                  {skill}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item className={style.provinceFilter}>
            <AutoComplete
              placeholder={t('field.provincePlaceholder')}
              value={selectedProvince}
              onChange={handleProvinceChange}
              options={provinceSuggestions.map((prov) => ({ value: prov }))}
              allowClear
              className={style.input}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Button type='primary' htmlType='submit' className={style.button}>
            <SearchOutlined />
            {t('field.search')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default JobFilter;
