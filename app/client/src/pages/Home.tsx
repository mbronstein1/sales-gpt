import { Box, List, ListItem, Stack, SvgIcon, Typography } from '@mui/material';
import { useContentContext } from '../hooks/use-content-context';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import GridLayout from 'react-grid-layout';
import { useMemo } from 'react';
import './Dashboard.css';

const Home = () => {
  const { gptResponse } = useContentContext();

  console.log(gptResponse);

  const layout = useMemo(
    () =>
      gptResponse?.data?.map((d, i) => ({
        i: i.toString(),
        x: d.gridCoordinates.x,
        y: d.gridCoordinates.y,
        w: d.gridCoordinates.w,
        h: d.gridCoordinates.h,
        static: true,
      })),
    [gptResponse]
  );

  console.log(layout);

  return (
    <>
      {gptResponse?.data?.length && layout ? (
        <Box sx={{ height: 700, maxHeight: '90%', overflowY: 'auto' }}>
          <GridLayout
            layout={layout}
            cols={12}
            rowHeight={50}
            width={1200}
            useCSSTransforms={false}
            isDraggable={false}
            isResizable={false}
          >
            {gptResponse.data.map((response, index) => (
              <Box key={index} className="text" sx={{ backgroundColor: response.color, p: 1 }}>
                <Box sx={{ overflowY: 'auto', height: '100%' }}>
                  <Box sx={{ pl: 0.5 }}>
                    <Typography variant="h6">{response.title}</Typography>
                  </Box>
                  <Box sx={{ padding: '0 5px 5px' }}>
                    {Array.isArray(response.content) ? (
                      <List sx={{ listStyleType: 'disc', pl: 2 }}>
                        {response.content.map((content, index) => (
                          <ListItem
                            disablePadding
                            key={index}
                            sx={{
                              display: 'list-item',
                            }}
                          >
                            <Typography variant="body1">{content}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body1">{response.content}</Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </GridLayout>
        </Box>
      ) : (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 10 }}>
          <SvgIcon>
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </SvgIcon>
          <Typography variant="h6" textAlign="center">
            Fill out the form and hit submit to generate a response!
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default Home;
