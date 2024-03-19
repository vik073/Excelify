// Imports
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Tooltip from 'react-tooltip-lite';

// App imports
import Item from './Item';
import Typography from 'ui/Typography';
import params from 'setup/config/params';
import ButtonIcon from 'ui/ButtonIcon';
import './style.css';

// Reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// Moves an item from one list to another list.
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle, color) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = () => ({
  display: 'flex',
  overflow: 'auto'
});

// Component
const Dimensions = ({
  dimensionsRowInitial,
  dimensionsColInitial,
  dimensionsMarkInitial,
  updateDimension,
  dimensionUpdate,
  expandDimension,
  isExpandingDimension,
  Ispermission
}) => {
  // state
  const [dimensionsRow, setDimensionsRow] = useState(dimensionsRowInitial);
  const [dimensionsCol, setDimensionsCol] = useState(dimensionsColInitial);
  const [dimensionsMark, setDimensionsMark] = useState(dimensionsMarkInitial);

  // on load
  useEffect(() => {
    setDimensionsRow(dimensionsRowInitial);
    setDimensionsCol(dimensionsColInitial);
    setDimensionsMark(dimensionsMarkInitial);
  }, [dimensionsRowInitial, dimensionsColInitial, dimensionsMarkInitial]);

  const id2List = {
    dimensionsRow: 'dimensionsRow',
    dimensionsCol: 'dimensionsCol'
  };

  const getList = id => {
    return id === 'dimensionsRow' ? dimensionsRow : dimensionsCol;
  };

  const onDragEnd = async result => {
    const update = {
      dimensionsRow,
      dimensionsCol
    };
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // within same dimension
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === 'dimensionsCol') {
        setDimensionsCol(items);
        update.dimensionsCol = items;
      } else {
        setDimensionsRow(items);
        update.dimensionsRow = items;
      }
    } else {
      // between dimensions
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setDimensionsCol(result.dimensionsCol);
      setDimensionsRow(result.dimensionsRow);

      update.dimensionsRow = result.dimensionsRow;
      update.dimensionsCol = result.dimensionsCol;
    }

    await dimensionUpdate(update);
  };

  return (
    <div className="dimensions">
      {/* dimensions */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="collection"
          style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}
        >
          {/* row */}
          <div className="list">
            {Ispermission == 'false' && (<div className="list-heading">
              <Typography
                size="h6"
                weight="medium"
                variant="secondary"
                className="text-muted"
              >ROW
              </Typography>
            </div>
            )}
            {Ispermission == 'true' && (<div className="list-heading">
              <Typography
                size="h6"
                weight="medium"
                variant="secondary"
                className="text-muted"
              >USER
              </Typography>
            </div>
            )}

            <div className="list-content">
              <Droppable droppableId="dimensionsRow" direction="horizontal">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} style={getListStyle()}>
                    {dimensionsRow.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item.color
                            )}
                          >
                            <Item
                              dimension={item}
                              updateDimension={updateDimension}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {Ispermission == 'false' && (
              <Tooltip content="Add new row dimension" hoverDelay={750}>
                <ButtonIcon
                  icon="add"
                  onClick={expandDimension(params.common.axis.row.key)}
                  title="Expand Dimension Row"
                  isLoading={isExpandingDimension}
                  size="s"
                />
              </Tooltip>)}
          </div>

          {/* column */}
          {Ispermission == 'false' && (
            <div className="list">
              <div className="list-heading">
                <Typography
                  size="h6"
                  weight="medium"
                  variant="secondary"
                  className="text-muted"
                >
                  COLUMN
              </Typography>
              </div>

              <div className="list-content">
                <Droppable droppableId="dimensionsCol" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {dimensionsCol.map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                item.color
                              )}
                            >
                              <Item
                                dimension={item}
                                updateDimension={updateDimension}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              <Tooltip content="Add new column dimension" hoverDelay={750}>
                <ButtonIcon
                  icon="add"
                  onClick={expandDimension(params.common.axis.col.key)}
                  title="Expand Dimension Mark"
                  isLoading={isExpandingDimension}
                  size="s"
                />
              </Tooltip>
            </div>
          )}
        </div>
      </DragDropContext>

      {/* marks */}
      <DragDropContext onDragEnd={() => { }}>
        <div
          className="collection"
          style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}
        >
          <div className="list">
            <div className="list-heading">
              <Typography
                size="h6"
                weight="medium"
                variant="secondary"
                className="text-muted"
              >
                MARK
              </Typography>
            </div>

            <div className="list-content">
              <Droppable droppableId="dimensionsMark" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {dimensionsMark.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item.color
                            )}
                          >
                            <Item
                              dimension={item}
                              updateDimension={updateDimension}
                              markItem={'true'}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dimensions;
