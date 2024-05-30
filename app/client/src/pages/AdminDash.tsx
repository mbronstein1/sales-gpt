import { useState, useMemo } from 'react';
import { useContentContext } from '../hooks/use-content-context';
import GridLayout from 'react-grid-layout';
import {
  IconButton,
  Box,
  Stack,
  SvgIcon,
  TextField,
  Input,
  Typography,
  Button,
} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './Dashboard.css';
import { colorNameToHex } from '../helpers/helper_functions';
import useHttp from '../hooks/use-http';
import { createContent, updateContent } from '../services/content.services';
import { useAuth } from '../hooks/use-auth';
import toast from 'react-hot-toast';

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface EditedContent {
  title: string;
  prompt: string;
}

const AdminDash = () => {
  const [selectedEditIndex, setSelectedEditIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<EditedContent>({ title: '', prompt: '' });

  const { profile } = useAuth();
  const { content, setContent, selectedContentIndex, newCategories, setNewCategories } =
    useContentContext();
  const { isLoading, fetchData: updateContentRequest } = useHttp(updateContent);
  const { isLoading: isCreatingContent, fetchData: createContentRequest } = useHttp(createContent);

  const layout = useMemo(() => {
    if (content.length === 0) return [];

    return content[selectedContentIndex].data.map((d, index) => ({
      i: index.toString(),
      ...d.gridCoordinates,
    }));
  }, [content, selectedContentIndex]);

  if (content.length === 0) return null;

  const handleLayoutChange = (layout: Layout[]) => {
    setContent((prevContent) => {
      const updatedContent = [...prevContent];
      updatedContent[selectedContentIndex].data = updatedContent[selectedContentIndex].data.map(
        (d, index) => ({
          ...d,
          gridCoordinates: {
            x: layout[index].x,
            y: layout[index].y,
            w: layout[index].w,
            h: layout[index].h,
          },
        })
      );
      return updatedContent;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedContent(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as EditedContent)
    );
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newColor = e.target.value;
    setContent((prev) => {
      const newPrev = [...prev];
      newPrev[selectedContentIndex].data[index].color = newColor;
      return newPrev;
    });
  };

  const handleEdit = (content: EditedContent, index: number) => {
    setEditedContent(content);
    setSelectedEditIndex(index);
  };

  const handleConfirmEdit = (index: number) => {
    setContent((prev) => {
      const newPrev = [...prev];
      newPrev[selectedContentIndex].data[index].prompt = editedContent?.prompt || '';
      newPrev[selectedContentIndex].data[index].title = editedContent?.title || '';
      return newPrev;
    });

    setEditedContent({ title: '', prompt: '' });
    setSelectedEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditedContent({ title: '', prompt: '' });
    setSelectedEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const newContent = content[selectedContentIndex].data.filter((_, i) => i !== index);
    setContent((prev) => {
      const newPrev = [...prev];
      newPrev[selectedContentIndex].data = newContent;
      return newPrev;
    });
  };

  const handleAddContent = () => {
    setContent((prev) => {
      const newPrev = [...prev];
      newPrev[selectedContentIndex].data.push({
        title: 'New Content',
        prompt: 'New Prompt',
        color: '#ffffff',
        gridCoordinates: {
          x: 0,
          y: Infinity,
          w: 6,
          h: 6,
        },
      });
      return newPrev;
    });

    setSelectedEditIndex(content[selectedContentIndex].data.length - 1);
    setEditedContent({ title: 'New Content', prompt: 'New Prompt' });
  };

  const handleConfirmChanges = async () => {
    const newContent = content[selectedContentIndex].data.map((d) => ({
      ...d,
      gridCoordinates: {
        x: d.gridCoordinates.x,
        y: d.gridCoordinates.y,
        w: d.gridCoordinates.w,
        h: d.gridCoordinates.h,
      },
    }));

    const updatedContent = content.map((c, index) =>
      index === selectedContentIndex ? { ...c, data: newContent } : c
    );

    const response = newCategories.includes(content[selectedContentIndex].category)
      ? await createContentRequest({
          companyId: profile.companyId,
          data: {
            category: content[selectedContentIndex].category,
            data: updatedContent[selectedContentIndex].data,
          },
        })
      : await updateContentRequest({
          companyId: profile.companyId,
          contentId: content[selectedContentIndex].id,
          data: updatedContent[selectedContentIndex],
        });

    if (!response) return;

    toast.success(response.data);
    setContent(updatedContent);
    setNewCategories((prev) => prev.filter((c) => c !== content[selectedContentIndex].category));
  };

  return (
    <>
      <Box sx={{ height: 700, maxHeight: '90%', overflowY: 'auto' }}>
        <GridLayout
          onLayoutChange={handleLayoutChange}
          layout={layout}
          cols={12}
          rowHeight={50}
          width={1200}
          useCSSTransforms={false}
        >
          {content[selectedContentIndex].data.map((d, index) => (
            <Box
              key={index}
              className="text"
              sx={{ userSelect: 'none', backgroundColor: d.color, p: 1 }}
            >
              <Box sx={{ overflowY: 'auto', height: '100%' }}>
                {selectedEditIndex === index ? (
                  <>
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        <TextField
                          name="title"
                          sx={{ backgroundColor: 'white' }}
                          value={editedContent.title}
                          fullWidth
                          size="small"
                          multiline
                          onChange={handleChange}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          {d.title}
                        </TextField>
                      </Box>
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        sx={{ backgroundColor: 'white' }}
                      >
                        <IconButton
                          onClick={() => handleConfirmEdit(index)}
                          onMouseDown={(e) => e.stopPropagation()}
                          sx={{
                            '&.MuiButtonBase-root:hover': {
                              bgcolor: 'transparent',
                            },
                          }}
                        >
                          <SvgIcon fontSize="small" color="success">
                            <CheckOutlinedIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          onClick={handleCancelEdit}
                          onMouseDown={(e) => e.stopPropagation()}
                          sx={{
                            '&.MuiButtonBase-root:hover': {
                              bgcolor: 'transparent',
                            },
                          }}
                        >
                          <SvgIcon fontSize="small" color="error">
                            <CloseOutlinedIcon />
                          </SvgIcon>
                        </IconButton>
                      </Stack>
                    </Stack>
                    <TextField
                      name="prompt"
                      sx={{ backgroundColor: 'white' }}
                      value={editedContent.prompt}
                      fullWidth
                      multiline
                      onChange={handleChange}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                  </>
                ) : (
                  <>
                    <Stack direction="row" justifyContent="space-between">
                      <Box sx={{ pl: 0.5 }}>
                        <Typography variant="h6">{d.title}</Typography>
                      </Box>
                      <Stack direction="row" justifyContent="flex-end" alignItems="center">
                        <Input
                          sx={{
                            cursor: 'pointer',
                            width: '20px',
                            height: '20px',
                            border: '1px solid black',
                            backgroundColor: 'white',
                            padding: 0, // Remove default padding
                            mr: 1,
                          }}
                          type="color"
                          value={colorNameToHex(d.color) || d.color}
                          onMouseDown={(e) => e.stopPropagation()}
                          onChange={(e) => handleColorChange(e, index)}
                        />
                        <IconButton
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={() => handleEdit({ prompt: d.prompt, title: d.title }, index)}
                        >
                          <SvgIcon fontSize="small">
                            <CreateOutlinedIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={() => handleDelete(index)}
                        >
                          <SvgIcon fontSize="small">
                            <DeleteOutlinedIcon />
                          </SvgIcon>
                        </IconButton>
                      </Stack>
                    </Stack>
                    <Box sx={{ padding: '0 5px 5px' }}>
                      <Typography variant="body1">{d.prompt}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          ))}
        </GridLayout>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ height: '10%', mx: 4 }}
        alignItems="center"
      >
        <Button onClick={handleAddContent} variant="outlined">
          Add Content
        </Button>
        <Button
          disabled={isLoading || isCreatingContent}
          onClick={handleConfirmChanges}
          variant="contained"
        >
          Confirm Changes
        </Button>
      </Stack>
    </>
  );
};

export default AdminDash;
