import { useState, useEffect } from 'react';
import { useContentContext } from '../hooks/use-content-context';
import GridLayout from 'react-grid-layout';
import { IconButton, Box, Stack, SvgIcon, TextField } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './AdminDash.css';

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const AdminDash = () => {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [selectedEditIndex, setSelectedEditIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string | null>(null);

  const { content, setContent, selectedContentIndex } = useContentContext();

  useEffect(() => {
    if (content.length === 0) return;

    const newLayout = content[selectedContentIndex].data.map((d, index) => ({
      i: index.toString(),
      ...d.gridCoordinates,
    }));

    setLayout(newLayout);
  }, [content, selectedContentIndex]);

  if (content.length === 0) return null;

  const handleLayoutChange = (layout: Layout[]) => {
    setLayout(layout);
  };

  const handleEdit = (prompt: string, index: number) => {
    setEditedContent(prompt);
    setSelectedEditIndex(index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleDelete = (index: number) => {
    const newContent = content[selectedContentIndex].data.filter((_, i) => i !== index);
    setContent((prev) => {
      const newPrev = [...prev];
      newPrev[selectedContentIndex].data = newContent;
      return newPrev;
    });
  };

  return (
    <GridLayout
      onLayoutChange={handleLayoutChange}
      layout={layout}
      cols={12}
      rowHeight={50}
      width={1200}
    >
      {content[selectedContentIndex].data.map((d, index) => (
        <Box key={index} className="text" sx={{ userSelect: 'none', overflowY: 'auto' }}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => handleEdit(d.prompt, index)}
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
          {selectedEditIndex === index ? (
            <TextField value={editedContent} onChange={handleChange} />
          ) : (
            <Box sx={{ pb: 1 }}>{d.prompt}</Box>
          )}
        </Box>
      ))}
    </GridLayout>
  );
};

export default AdminDash;
