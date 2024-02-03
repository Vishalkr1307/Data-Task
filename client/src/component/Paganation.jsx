import { Box, Button, HStack, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskData } from '../redux/app/action';

const Pagination = ({data,perPage,setData}) => {
  const { task, totalItem, pageItem, loading } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const [itemPerPage, setItemPerPage] = useState(perPage||5);

  const [page, setPage] = useState(1);
  

  useEffect(() => {
    dispatch(getTaskData());
  }, [dispatch]);

  const totalPage = Math.ceil(totalItem / itemPerPage);
  const pagesArray = new Array(totalPage || null).fill("-1");

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPage) {
      return;
    }
  
    setPage(pageNumber);
  };
  
  useEffect(()=>{
    setData(page)
  },[handlePageChange])

  return (
    <Box display={'flex'} justifyContent={'center'} minH={'20vh'} minW={'100vw'} mt={'auto'}>
      <HStack display={'flex'} justifyContent={'center'}>
        <Button colorScheme='teal' onClick={() => handlePageChange(page - 1)} disabled={page === 1 || loading}>
          Previous
        </Button>

        {loading ? (
          <Spinner />
        ) : (
          pagesArray.map((item, ind) => (
            <Button
              colorScheme='teal'
              key={ind}
              onClick={() => handlePageChange(ind + 1)}
              isActive={ind + 1 === page}
            >
              {ind + 1}
            </Button>
          ))
        )}

        <Button
          colorScheme='teal'
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPage || loading}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default Pagination;
