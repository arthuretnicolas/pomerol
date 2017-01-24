defmodule Pomerol.OrganizationItemView do
  use Pomerol.Web, :view

  def render("organization_item.json", %{organization_item: organization_item}) do
    case organization_item.type do
      "price-item" -> render_one(organization_item, __MODULE__, "organization_price_item.json", as: :price_item)
      "text-item" -> render_one(organization_item, __MODULE__, "organization_text_item.json", as: :text_item)
      _ -> ""
    end
  end

  def render("organization_text_item.json", %{text_item: text_item}) do
    %{
      id: text_item.id,
      type: text_item.type,
      title: text_item.title,
      description: text_item.description,
      organization_id: text_item.organization_id,
      archived: text_item.archived,
      attachments: render_many(text_item.attachments, __MODULE__, "organization_attachment.json", as: :organization_attachment)
    }
  end

  def render("organization_price_item.json", %{price_item: price_item}) do
    %{
      id: price_item.id,
      type: price_item.type
    }
  end

  def render("organization_attachment.json", %{organization_attachment: organization_attachment}) do
    %{
      id: organization_attachment.id,
      media_large_url: Pomerol.OrganizationItemMedia.url({organization_attachment.media, organization_attachment}, :large),
      media_thumb_url: Pomerol.OrganizationItemMedia.url({organization_attachment.media, organization_attachment}, :thumb)
    }
  end
end
