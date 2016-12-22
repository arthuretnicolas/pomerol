defmodule Pomerol.ErrorViewTest do
  use Pomerol.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.json" do
    rendered_json =  render(Pomerol.ErrorView, "404.json", [])

    expected_json = %{
      errors: %{message: "404 Resource not found"}
    }
    assert rendered_json == expected_json
  end

  test "renders 500.json" do
    rendered_json =  render(Pomerol.ErrorView, "500.json", [])

    expected_json = %{
      errors: %{message: "500 Internal server error"}
    }
    assert rendered_json == expected_json
  end

  test "render any other" do
    string = render_to_string(Pomerol.ErrorView, "505.json", [])

    assert String.contains? string, "Internal server error"
  end
end
