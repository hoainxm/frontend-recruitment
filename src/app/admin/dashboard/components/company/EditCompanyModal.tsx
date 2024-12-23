import React, { FC, useState, useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Upload, Button, Select, message } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadOutlined } from '@ant-design/icons';
import { EditCompanyModalProps } from './type';
import { uploadLogo } from './api';

const { Option } = Select;

const EditCompanyModal: FC<EditCompanyModalProps> = ({ isVisible, onClose, onSubmit, form, companyData }) => {
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (companyData) {
      form.setFieldsValue({
        ...companyData,
        description: companyData.description || '',
        logo: companyData.logo || '',
      });

      setFileList(
        companyData.logo
          ? [
              {
                uid: '-1',
                name: 'logo',
                status: 'done',
                url: companyData.logo,
              },
            ]
          : []
      );
    }
  }, [companyData, form]);

  const handleFileChange = async (info: any) => {
    const { file } = info;

    const uploadedFile = file.originFileObj || file;

    if (!uploadedFile) {
      message.error('Không tìm thấy file để upload!');
      return;
    }

    try {
      const response = await uploadLogo(uploadedFile);

      if (response?.data?.fileName) {
        const fileName = response.data.fileName;

        form.setFieldsValue({ logo: fileName });
        setFileList([
          {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: response.data.url || '',
          },
        ]);

        message.success('Ảnh logo đã được cập nhật thành công!');
      } else {
        throw new Error('Phản hồi API không có fileName.');
      }
    } catch (error) {
      console.error('Lỗi upload file:', error);
      message.error('Lỗi khi tải lên ảnh logo!');
      setFileList([]);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal width={1000} title='Chỉnh sửa Company' visible={isVisible} onCancel={handleCancel} footer={null}>
      <Form
        form={form}
        layout='vertical'
        onFinish={(values) => {
          const updatedValues = {
            ...values,
            description: form.getFieldValue('description'),
            logo: form.getFieldValue('logo'),
          };
          console.log('Dữ liệu chỉnh sửa:', updatedValues);
          onSubmit(updatedValues);
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Tên công ty' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}>
              <Input placeholder='Nhập tên công ty' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ công ty!' }]}>
              <Input placeholder='Nhập địa chỉ công ty' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Ảnh Logo' name='logo' rules={[{ required: true, message: 'Vui lòng upload ảnh logo!' }]}>
              <Upload listType='picture-card' maxCount={1} fileList={fileList} beforeUpload={() => false} onChange={handleFileChange}>
                {fileList.length < 1 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Quy mô' name='scale' rules={[{ required: true, message: 'Vui lòng chọn quy mô!' }]}>
              <Select placeholder='Chọn quy mô'>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
                <Option value={200}>200</Option>
                <Option value={300}>300</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label='Miêu tả' name='description' rules={[{ required: true, message: 'Vui lòng nhập miêu tả!' }]}>
          <CKEditor
            editor={ClassicEditor}
            data={form.getFieldValue('description') || ''}
            onReady={(editor) => {
              const editableElement = editor.ui.view.editable?.element;
              if (editableElement) {
                editableElement.style.minHeight = '250px';
              }
            }}
            onChange={(_, editor) => {
              const data = editor.getData();
              form.setFieldsValue({ description: data });
            }}
          />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='primary' htmlType='submit'>
            Lưu thay đổi
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCompanyModal;
