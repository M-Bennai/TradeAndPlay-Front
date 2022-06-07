import { render, screen } from "@testing-library/react";
import { CreerAnnonce } from "./CreerAnnonce";

test("article", () => {
  it("renderer input", () => {
    render(<CreerAnnonce />);

    screen.getByRole();
    // const { getByTestId } = render(<CreerAnnonce />);
    // const input = screen.getByTestId("input");
    // expect(input).toBeTruthy();
  });
  //   render(<CreerAnnonce />);
  //   expect();
});
