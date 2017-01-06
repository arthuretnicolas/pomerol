defmodule Pomerol.ErrorView do
  use Pomerol.Web, :view

  def render("404.json", _assigns) do
    %{errors: %{message: "404 Resource not found"}}
  end

  def render("500.json", _assigns) do
    %{errors: %{message: "500 Internal server error"}}
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "500.json", assigns
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

  def render("422.json", %{changeset: changeset}) do
    Ecto.Changeset.traverse_errors(changeset, fn
      {msg, opts} -> String.replace(msg, "%{count}", to_string(opts[:count]))
      msg -> msg
    end)
  end

end
