import { SerializedComponent, SerializedForm, Theme } from "@fab4m/fab4m";
import React, { forwardRef, useState } from "react";
import t from "../translations";
import { Plugins } from "..";
import { draggableItems, findKey } from "../util";
import styles from "../styles";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItem";
import { produce } from "immer";

export type FormBuilderProps = {
  plugins: Plugins;
  form: SerializedForm;
  themes: Theme[];
  formChanged: (form: SerializedForm) => void;
};

export default function FormBuilder(props: FormBuilderProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const items = draggableItems(props.form.components);
  function setActive(id: UniqueIdentifier) {
    setActiveItem(id.toString());
  }
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveItem(null);
    props.formChanged(
      produce(props.form, (draft) => {
        if (over && active.id !== over.id) {
          const from = active.id.toString();
          const to = over.id.toString();
          const [sourceList, sourceIndex] = findKey(draft.components, from);
          const [targetList, targetIndex] = findKey(draft.components, to);
          if (sourceList && targetList) {
            const item = sourceList[sourceIndex];
            if (sourceIndex !== -1 && targetIndex !== -1) {
              sourceList.splice(sourceIndex, 1);
              targetList.splice(targetIndex, 0, item);
            }
          }
        }
      }),
    );
  }
  return (
    <main>
      <div className="mb-6">
        <DndContext
          sensors={sensors}
          onDragStart={(e) => setActive(e.active.id)}
          onDragEnd={handleDragEnd}
        >
          <Components items={items} parent="root:" activeItem={activeItem} />
          <DragOverlay>
            {activeItem ? (
              <Item title={items.get(activeItem)?.label ?? ""}></Item>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </main>
  );
}

interface ComponentsProps {
  parent: string;
  items: Map<string, SerializedComponent>;
  selectedComponent?: SerializedComponent;
  activeItem: string | null;
}

function Components(props: ComponentsProps) {
  const renderedItems: JSX.Element[] = [];
  for (const [key, component] of props.items.entries()) {
    if (key === `${props.parent}${component.name}`) {
      renderedItems.push(
        <React.Fragment key={key}>
          <SortableItem
            name={component.name ?? ""}
            parent={props.parent}
            header={
              <>
                {component.type !== "pagebreak"
                  ? component.label ?? component.name
                  : t("pageBreak")}
              </>
            }
          >
            {component.type === "group" && (
              <div className="border -mt-3 dark:border-slate-600 p-3 pl-5 dark:bg-slate-800">
                <Components
                  parent={
                    props.parent !== "root:"
                      ? `${props.parent}${component.name}:`
                      : `${component.name}:`
                  }
                  items={props.items}
                  activeItem={props.activeItem}
                />
              </div>
            )}
          </SortableItem>
        </React.Fragment>,
      );
    }
  }
  return (
    <div>
      <SortableContext
        items={[...props.items.keys()].filter((k) =>
          k.startsWith(props.parent),
        )}
        strategy={verticalListSortingStrategy}
      >
        {renderedItems}
      </SortableContext>
    </div>
  );
}

export const Item = forwardRef<HTMLDivElement, { title: string }>(
  ({ title, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        <div className={`${styles.item} mb-0`}>{title}</div>
      </div>
    );
  },
);
