

const ObjectFields = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'HW_USER.username',
      query:true,
      sorter:true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'HW_USER.password',
      query:false,
      sorter:true,
      hide:true
      
    },
    {
      title: '别名',
      dataIndex: 'alias',
      key: 'HW_USER.alias',
      query:true,
      sorter:true,
    },
    {
      title: '备注',
      dataIndex: 'nt',
      key: 'HW_USER.nt',
      query:true,
      sorter:true,
    },
    {
      title: '角色',
      dataIndex: 'roleDesp',
      key: 'roleDesp',
      query:true,
      sorter:true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'HW_USER.state',
      query:true,
      sorter:true,
    },
  ]
export default ObjectFields;

