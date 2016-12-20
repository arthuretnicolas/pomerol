defmodule Pomerol.ErrorView do
  use Pomerol.Web, :view

  def render("404.html", _assigns) do
    "Page not found"
  end

  def render("500.html", _assigns) do
    "Internal server error"
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "500.html", assigns
  end

  def render("404.json", %{message: message}) do
    %{
      errors: [
        %{
          id: "NOTFOUND",
          title: "404 Not Found",
          detail: message,
          status: 404,
        }
      ]
    }
  end

  def render("error.json", %{errors: errors}) do
    %{
      errors: errors
    }
  end
end
