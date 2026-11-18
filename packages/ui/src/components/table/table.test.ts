import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ref } from "vue";
import Table from "./Table.vue";
import TableBody from "./TableBody.vue";
import TableCaption from "./TableCaption.vue";
import TableCell from "./TableCell.vue";
import TableColgroup from "./TableColgroup.vue";
import TableColumn from "./TableColumn.vue";
import TableHead from "./TableHead.vue";
import TableHeader from "./TableHeader.vue";
import TableRow from "./TableRow.vue";
import TableScroll from "./TableScroll.vue";
import TableSortableHead from "./TableSortableHead.vue";
import TableSortButton from "./TableSortButton.vue";

const components = {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColgroup,
  TableColumn,
  TableHead,
  TableHeader,
  TableRow,
  TableScroll,
  TableSortableHead,
  TableSortButton,
};

describe("Table", () => {
  it("renders native table semantics", () => {
    const wrapper = mount({
      components,
      template: `
        <Table>
          <TableCaption>Members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead align="right">Seats</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell align="right">12</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      `,
    });

    expect(wrapper.find("table").exists()).toBe(true);
    expect(wrapper.find("caption").text()).toBe("Members");
    expect(wrapper.find("th").attributes("scope")).toBe("col");
    expect(wrapper.find("th").classes()).toContain("text-right");
    expect(wrapper.find("td").classes()).toContain("text-right");
    expect(wrapper.find("tbody").classes()).toContain("[&>tr]:hover:bg-fill-subtle");
  });

  it("cycles the sort and exposes aria-sort on the heading", async () => {
    const wrapper = mount({
      components,
      setup: () => ({ sort: ref<"ascending" | "descending" | undefined>(undefined) }),
      template: `
        <Table>
          <TableHeader>
            <TableRow>
              <TableSortableHead :sort="sort" @sort-change="sort = $event">Name</TableSortableHead>
            </TableRow>
          </TableHeader>
        </Table>
      `,
    });

    const button = wrapper.find("[data-slot=table-sort-button]");
    expect(button.attributes("type")).toBe("button");
    expect(wrapper.find("th").attributes("aria-sort")).toBeUndefined();

    await button.trigger("click");
    expect(wrapper.find("th").attributes("aria-sort")).toBe("ascending");
    expect(wrapper.find("[data-slot=table-sort-arrow]").exists()).toBe(true);

    await button.trigger("click");
    expect(wrapper.find("th").attributes("aria-sort")).toBe("descending");
  });

  it("keeps the arrow slot empty when unsorted", () => {
    const wrapper = mount({
      components,
      template: `<TableSortButton align="left">Name</TableSortButton>`,
    });

    expect(wrapper.find("[data-slot=table-sort-arrow]").exists()).toBe(false);
    expect(wrapper.find("[data-slot=table-sort-arrow-space]").exists()).toBe(true);
  });

  it("makes a wide table a keyboard-reachable scroll region", () => {
    const wrapper = mount({
      components,
      template: `<TableScroll><Table><TableBody><TableRow><TableCell>Wide</TableCell></TableRow></TableBody></Table></TableScroll>`,
    });

    const region = wrapper.find("[data-slot=table-scroll]");
    expect(region.attributes("tabindex")).toBe("0");
    expect(region.attributes("role")).toBe("region");
    expect(region.classes()).toContain("overflow-x-auto");
  });

  it("supports fixed columns through colgroup", () => {
    const wrapper = mount({
      components,
      template: `
        <Table class="table-fixed">
          <TableColgroup><TableColumn class="w-1/2" /><TableColumn class="w-1/2" /></TableColgroup>
          <TableBody><TableRow><TableCell>A</TableCell><TableCell>B</TableCell></TableRow></TableBody>
        </Table>
      `,
    });

    expect(wrapper.findAll("col")).toHaveLength(2);
    expect(wrapper.find("table").classes()).toContain("table-fixed");
  });
});
