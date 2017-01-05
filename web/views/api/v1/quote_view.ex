defmodule Pomerol.QuoteView do
  use Pomerol.Web, :view

  def render("quote.json", %{quote: quote}) do
    %{
      id: quote.id,
      title: quote.title
    }
  end
end
